import { useState } from 'react';
import UsersPage from './pages/UsersPage';
import TransactionsPage from './pages/TransactionsPage';
import WithdrawalsPage from './pages/WithdrawalsPage';
import './App.css';

type Page = 'users' | 'transactions' | 'withdrawals';

export default function App() {
  const [page, setPage] = useState<Page>('users');

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Goldcrest</div>
        <nav className="nav">
          <button
            type="button"
            className={`navItem ${page === 'users' ? 'active' : ''}`}
            onClick={() => setPage('users')}
          >
            Users
          </button>
          <button
            type="button"
            className={`navItem ${page === 'transactions' ? 'active' : ''}`}
            onClick={() => setPage('transactions')}
          >
            Transactions
          </button>
          <button
            type="button"
            className={`navItem ${page === 'withdrawals' ? 'active' : ''}`}
            onClick={() => setPage('withdrawals')}
          >
            Withdrawals
          </button>
        </nav>
        <p className="sidebarHint">No auth — add before production.</p>
      </aside>
      <main className="main">
        {page === 'users' ? <UsersPage /> : null}
        {page === 'transactions' ? <TransactionsPage /> : null}
        {page === 'withdrawals' ? <WithdrawalsPage /> : null}
      </main>
    </div>
  );
}
