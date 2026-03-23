import { useCallback, useEffect, useState } from 'react';
import {
  fetchAllWithdrawals,
  updateWithdrawalStatus,
  type AdminWithdrawal,
} from '../api';

export default function WithdrawalsPage() {
  const [rows, setRows] = useState<AdminWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const list = await fetchAllWithdrawals();
      setRows(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onUpdate = async (w: AdminWithdrawal, status: 'COMPLETED' | 'REJECTED') => {
    setNotice(null);
    setBusyId(w.id);
    try {
      const note = notes[w.id]?.trim();
      await updateWithdrawalStatus(w.id, status, note || undefined);
      setNotice(`Withdrawal #${w.id} → ${status}`);
      await load();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="pageHeader">
        <h2>Withdrawal requests</h2>
        <p className="sub">Approve (completed) or reject — refunds user on reject</p>
        <button type="button" className="refresh" onClick={() => void load()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="banner error">{error}</div> : null}
      {notice ? <div className="banner ok">{notice}</div> : null}

      {loading && rows.length === 0 ? (
        <p className="muted">Loading…</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Network</th>
                <th>Status</th>
                <th>Admin note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(w => (
                <tr key={w.id}>
                  <td className="mono">{w.id}</td>
                  <td>{w.userEmail ?? w.userId}</td>
                  <td className="mono">${w.amountUsd}</td>
                  <td className="mono" style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {w.destinationAddress}
                  </td>
                  <td>{w.network}</td>
                  <td>
                    <span
                      className={
                        w.status === 'PENDING'
                          ? 'tag tag-pending'
                          : w.status === 'COMPLETED'
                            ? 'tag tag-ok'
                            : 'tag tag-bad'
                      }
                    >
                      {w.status}
                    </span>
                  </td>
                  <td>
                    <input
                      className="input input-wide"
                      type="text"
                      placeholder="Optional note"
                      value={notes[w.id] ?? w.adminNote ?? ''}
                      onChange={e =>
                        setNotes(prev => ({ ...prev, [w.id]: e.target.value }))
                      }
                      disabled={w.status !== 'PENDING' || busyId === w.id}
                    />
                  </td>
                  <td>
                    {w.status === 'PENDING' ? (
                      <div className="actionRow">
                        <button
                          type="button"
                          className="btn btn-success"
                          disabled={busyId === w.id}
                          onClick={() => void onUpdate(w, 'COMPLETED')}
                        >
                          Complete
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          disabled={busyId === w.id}
                          onClick={() => void onUpdate(w, 'REJECTED')}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="muted">—</span>
                    )}
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
