import { useCallback, useEffect, useState } from 'react';
import { fetchAllTransactions, type AdminTransaction } from '../api';

export default function TransactionsPage() {
  const [rows, setRows] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const list = await fetchAllTransactions();
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

  return (
    <div>
      <div className="pageHeader">
        <h2>Transaction history</h2>
        <p className="sub">All ledger entries (newest first)</p>
        <button type="button" className="refresh" onClick={() => void load()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="banner error">{error}</div> : null}

      {loading && rows.length === 0 ? (
        <p className="muted">Loading…</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>User</th>
                <th>Kind</th>
                <th>Status</th>
                <th>USD</th>
                <th>Crypto</th>
                <th>WR #</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(t => (
                <tr key={t.id}>
                  <td className="mono">{t.id}</td>
                  <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td>{t.userEmail ?? t.userId}</td>
                  <td>{t.kind}</td>
                  <td>{t.status}</td>
                  <td className="mono">${t.grossUsd}</td>
                  <td className="mono">
                    {t.cryptoAmount != null
                      ? `${t.cryptoAmount} ${t.cryptoSymbol ?? ''}`
                      : '—'}
                  </td>
                  <td className="mono">{t.withdrawalRequestId ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
