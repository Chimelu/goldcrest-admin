import { useCallback, useEffect, useState } from 'react';
import {
  fetchUsers,
  setUserCanTransact,
  topUpWallet,
  type AdminUser,
} from '../api';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<Record<number, string>>({});
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const list = await fetchUsers();
      setUsers(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onTopUp = async (user: AdminUser) => {
    const raw = amounts[user.id]?.trim() ?? '';
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) {
      setNotice('Enter a positive amount (USD).');
      return;
    }
    setNotice(null);
    setBusyId(user.id);
    try {
      const result = await topUpWallet(user.id, n);
      setNotice(
        `User ${user.email}: +$${result.creditedUsd} → balance $${result.newAvailableUsd}`,
      );
      setAmounts(prev => ({ ...prev, [user.id]: '' }));
      await load();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'Top-up failed');
    } finally {
      setBusyId(null);
    }
  };

  const onToggleCanTransact = async (user: AdminUser) => {
    setNotice(null);
    setBusyId(user.id);
    try {
      const next = !user.canTransact;
      await setUserCanTransact(user.id, next);
      setNotice(
        `${user.email}: canTransact ${next ? 'enabled' : 'disabled'}`,
      );
      await load();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'Could not update access');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="pageHeader">
        <h2>Users</h2>
        <p className="sub">Wallet balances and top-ups</p>
        <button type="button" className="refresh" onClick={() => void load()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="banner error">{error}</div> : null}
      {notice ? <div className="banner ok">{notice}</div> : null}

      {loading && users.length === 0 ? (
        <p className="muted">Loading users…</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Verified</th>
                <th>Can transact</th>
                <th>USD balance</th>
                <th>Top up (USD)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="mono">{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.fullName ?? '—'}</td>
                  <td>{u.isVerified ? 'Yes' : 'No'}</td>
                  <td>
                    <button
                      type="button"
                      className={`btn ${u.canTransact ? 'btn-danger' : 'btn-success'}`}
                      disabled={busyId === u.id}
                      onClick={() => void onToggleCanTransact(u)}
                    >
                      {u.canTransact ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                  <td className="mono">${u.availableUsd}</td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={amounts[u.id] ?? ''}
                      onChange={e =>
                        setAmounts(prev => ({ ...prev, [u.id]: e.target.value }))
                      }
                      disabled={busyId === u.id}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      disabled={busyId === u.id}
                      onClick={() => void onTopUp(u)}
                    >
                      {busyId === u.id ? '…' : 'Top up'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
