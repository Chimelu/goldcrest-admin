import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Goldcrest</div>
        <nav className="nav">
          <NavLink to="/users" className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}>
            Users
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            Transactions
          </NavLink>
          <NavLink
            to="/withdrawals"
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            Withdrawals
          </NavLink>
        </nav>
        <p className="sidebarHint">No auth — add before production.</p>
        <div className="sidebarFooter">
          <NavLink to="/support" className="navItem navItemSecondary">
            Support
          </NavLink>
          <NavLink to="/delete-account" className="navItem navItemSecondary">
            Delete account
          </NavLink>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
