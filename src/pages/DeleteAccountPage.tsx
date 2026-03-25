import { Link } from 'react-router-dom';
import { useState } from 'react';
import { confirmAccountDeletion, requestAccountDeletion, resendAccountDeletion } from '../api';

type Step = 'email' | 'otp' | 'done';

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSendCode() {
    setError(null);
    setInfo(null);
    if (!email.trim()) {
      setError('Enter the email you used to register.');
      return;
    }
    if (!acknowledged) {
      setError('Confirm that you understand deletion is permanent.');
      return;
    }
    setLoading(true);
    try {
      const r = await requestAccountDeletion(email);
      setInfo(r.message);
      setStep('otp');
      setOtp('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setError(null);
    setInfo(null);
    setResendLoading(true);
    try {
      const r = await resendAccountDeletion(email);
      setInfo(r.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not resend');
    } finally {
      setResendLoading(false);
    }
  }

  async function onConfirmDelete() {
    setError(null);
    const code = otp.replace(/\D/g, '');
    if (code.length !== 6) {
      setError('Enter the 6-digit code from your email.');
      return;
    }
    setLoading(true);
    try {
      await confirmAccountDeletion(email, code);
      setStep('done');
      setInfo(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="publicPage">
      <header className="publicTopBar">
        <Link to="/users" className="publicBrand">
          Goldcrest
        </Link>
        <nav className="publicTopNav">
          <Link to="/support" className="publicTopLink">
            Support
          </Link>
          <Link to="/delete-account" className="publicTopLink active">
            Delete account
          </Link>
        </nav>
      </header>

      <div className="publicInner">
        <section className="publicHero">
          <p className="publicEyebrow">Account</p>
          <h1 className="publicTitle">Delete your Goldcrest account</h1>
          <p className="publicLead">
            Account deletion is permanent. Enter your email, confirm with the one-time code we send, and we
            will remove your account and associated data (verified accounts only).
          </p>
        </section>

        <section className="publicAlert">
          <strong className="publicAlertTitle">Before you continue</strong>
          <p className="publicAlertText">
            Goldcrest is for market data and news. If you use saved preferences or watchlists, keep anything
            you need elsewhere; deleting your account removes data tied to this email.
          </p>
        </section>

        {error ? (
          <div className="banner error publicFlowBanner" role="alert">
            {error}
          </div>
        ) : null}
        {info && step !== 'done' ? (
          <div className="banner ok publicFlowBanner" role="status">
            {info}
          </div>
        ) : null}

        {step === 'email' ? (
          <section className="publicGrid singleColumn">
            <article className="publicCard">
              <h2 className="publicCardTitle">What we remove</h2>
              <ul className="publicList">
                <li>Your profile and login credentials.</li>
                <li>Access to price feeds, charts, news, and preferences stored with your account.</li>
                <li>Wallet, holdings, and transaction history linked to this user (if any).</li>
              </ul>
            </article>

            <article className="publicCard">
              <h2 className="publicCardTitle">What may be retained</h2>
              <ul className="publicList">
                <li>Aggregated or anonymized analytics that cannot identify you.</li>
                <li>Records we are required to keep for legal, tax, or fraud-prevention reasons.</li>
              </ul>
            </article>

            <article className="publicCard">
              <h2 className="publicCardTitle">Your email</h2>
              <label className="publicFieldLabel" htmlFor="del-email">
                Registered email
              </label>
              <input
                id="del-email"
                className="publicInput"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="publicCheckboxRow" style={{ marginTop: '14px' }}>
                <label className="publicCheckboxLabel">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="publicCheckbox"
                  />
                  <span>I understand that deletion is permanent.</span>
                </label>
              </div>
              <div className="publicActionRow" style={{ marginTop: '18px' }}>
                <button type="button" className="btn btn-danger" disabled={loading} onClick={onSendCode}>
                  {loading ? 'Sending…' : 'Send confirmation code'}
                </button>
                <Link to="/support" className="btn publicGhostBtn">
                  Back to support
                </Link>
              </div>
            </article>
          </section>
        ) : null}

        {step === 'otp' ? (
          <section className="publicGrid singleColumn">
            <article className="publicCard">
              <h2 className="publicCardTitle">Enter your code</h2>
              <p className="publicCardText">
                We sent a 6-digit code to <span className="mono">{email.trim()}</span>. Unverified accounts
                do not receive a code—use the email you verified at sign-up.
              </p>
              <label className="publicFieldLabel" htmlFor="del-otp">
                Confirmation code
              </label>
              <input
                id="del-otp"
                className="publicInput publicInputMono"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <div className="publicActionRow" style={{ marginTop: '18px' }}>
                <button type="button" className="btn btn-danger" disabled={loading} onClick={onConfirmDelete}>
                  {loading ? 'Deleting…' : 'Confirm and delete account'}
                </button>
                <button
                  type="button"
                  className="btn publicGhostBtn"
                  disabled={resendLoading}
                  onClick={onResend}
                >
                  {resendLoading ? 'Sending…' : 'Resend code'}
                </button>
                <button
                  type="button"
                  className="btn publicGhostBtn"
                  onClick={() => {
                    setStep('email');
                    setError(null);
                    setInfo(null);
                  }}
                >
                  Change email
                </button>
              </div>
            </article>
          </section>
        ) : null}

        {step === 'done' ? (
          <section className="publicGrid singleColumn">
            <article className="publicCard publicCardSuccess">
              <h2 className="publicCardTitle">Account deleted</h2>
              <p className="publicCardText">
                Your Goldcrest account for this email has been removed. You can close this page or return to
                support.
              </p>
              <div className="publicActionRow">
                <Link to="/support" className="btn">
                  Back to support
                </Link>
                <Link to="/users" className="btn publicGhostBtn">
                  Admin
                </Link>
              </div>
            </article>
          </section>
        ) : null}
      </div>

      <footer className="publicFooter">
        <Link to="/users" className="publicFooterLink">
          Admin
        </Link>
        <span className="publicFooterDot">·</span>
        <span className="publicFooterMeta">Goldcrest</span>
      </footer>
    </div>
  );
}
