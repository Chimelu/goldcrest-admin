# Goldcrest Admin

React + TypeScript UI to list users and **top up USD wallet** balances (calls `goldcrest-api` admin routes).

## Prereqs

- `goldcrest-api` running (default `http://localhost:4000`)

## Dev

```bash
cd goldcrest-admin
npm install
npm run dev
```

Open `http://localhost:5173`.

With the default Vite config, `/admin/*` is **proxied** to `http://localhost:4000`, so you can leave `VITE_API_BASE_URL` unset during local dev.

To call a remote API instead, create `.env`:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

## API used (no auth — secure before production)

| Method | Path | Body |
|--------|------|------|
| GET | `/admin/users` | — |
| POST | `/admin/users/:userId/top-up` | `{ "amountUsd": 100 }` |

## Build

```bash
npm run build
npm run preview
```
