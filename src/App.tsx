import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UsersPage from './pages/UsersPage';
import TransactionsPage from './pages/TransactionsPage';
import WithdrawalsPage from './pages/WithdrawalsPage';
import SupportPage from './pages/SupportPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/support" replace />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/withdrawals" element={<WithdrawalsPage />} />
      </Route>
      <Route path="/support" element={<SupportPage />} />
      <Route path="/delete-account" element={<DeleteAccountPage />} />
      <Route path="*" element={<Navigate to="/support" replace />} />
    </Routes>
  );
}
