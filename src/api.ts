const base =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'https://goldcrest-backend.vercel.app';

function url(path: string): string {
  if (base) return `${base}${path}`;
  return path;
}

export type AdminUser = {
  id: number;
  email: string;
  fullName: string | null;
  isVerified: boolean;
  canTransact: boolean;
  createdAt: string;
  availableUsd: string;
  hasWallet: boolean;
};

export async function fetchUsers(): Promise<AdminUser[]> {
  const res = await fetch(url('/admin/users'));
  const json = (await res.json()) as { users?: AdminUser[]; message?: string };
  if (!res.ok) {
    throw new Error(json.message || 'Failed to load users');
  }
  if (!json.users) throw new Error('Invalid response');
  return json.users;
}

export async function topUpWallet(
  userId: number,
  amountUsd: number,
): Promise<{
  message: string;
  newAvailableUsd: string;
  creditedUsd: string;
}> {
  const res = await fetch(url(`/admin/users/${userId}/top-up`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amountUsd }),
  });
  const json = (await res.json()) as {
    message?: string;
    newAvailableUsd?: string;
    creditedUsd?: string;
  };
  if (!res.ok) {
    throw new Error(json.message || 'Top-up failed');
  }
  return {
    message: json.message || 'OK',
    newAvailableUsd: json.newAvailableUsd ?? '',
    creditedUsd: json.creditedUsd ?? '',
  };
}

export async function setUserCanTransact(
  userId: number,
  canTransact: boolean,
): Promise<void> {
  const res = await fetch(url(`/admin/users/${userId}/can-transact`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ canTransact }),
  });
  const json = (await res.json()) as { message?: string };
  if (!res.ok) {
    throw new Error(json.message || 'Could not update transact access');
  }
}

export type AdminTransaction = {
  id: number;
  userId: number;
  userEmail: string | null;
  kind: string;
  status: string;
  cryptoSymbol: string | null;
  cryptoAmount: string | null;
  unitPriceUsd: string | null;
  grossUsd: string;
  feeUsd: string;
  withdrawalRequestId: number | null;
  createdAt: string;
};

export async function fetchAllTransactions(): Promise<AdminTransaction[]> {
  const res = await fetch(url('/admin/transactions'));
  const json = (await res.json()) as {
    transactions?: AdminTransaction[];
    message?: string;
  };
  if (!res.ok) {
    throw new Error(json.message || 'Failed to load transactions');
  }
  return json.transactions ?? [];
}

export type AdminWithdrawal = {
  id: number;
  userId: number;
  userEmail: string | null;
  userFullName: string | null;
  amountUsd: string;
  destinationAddress: string;
  network: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function fetchAllWithdrawals(): Promise<AdminWithdrawal[]> {
  const res = await fetch(url('/admin/withdrawals'));
  const json = (await res.json()) as {
    withdrawals?: AdminWithdrawal[];
    message?: string;
  };
  if (!res.ok) {
    throw new Error(json.message || 'Failed to load withdrawals');
  }
  return json.withdrawals ?? [];
}

export async function updateWithdrawalStatus(
  id: number,
  status: 'COMPLETED' | 'REJECTED',
  adminNote?: string,
): Promise<void> {
  const res = await fetch(url(`/admin/withdrawals/${id}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, adminNote: adminNote ?? undefined }),
  });
  const json = (await res.json()) as { message?: string };
  if (!res.ok) {
    throw new Error(json.message || 'Update failed');
  }
}
