import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function DeleteAccountPage() {
  const [acknowledged, setAcknowledged] = useState(false);

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
            Account deletion is permanent. This page explains what happens to your data and app access so you can
            decide before you contact us.
          </p>
        </section>

        <section className="publicAlert">
          <strong className="publicAlertTitle">Before you continue</strong>
          <p className="publicAlertText">
            Goldcrest is for market data and news only—not trading. If you use saved preferences or watchlists,
            note anything you want to keep outside the app; deleting your account removes that tied-to-you data.
          </p>
        </section>

        <section className="publicGrid singleColumn">
          <article className="publicCard">
            <h2 className="publicCardTitle">What we remove</h2>
            <ul className="publicList">
              <li>Your profile and login credentials.</li>
              <li>Access to price feeds, charts, news, and any preferences stored with your account.</li>
              <li>Association between your email and this Goldcrest account.</li>
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
            <h2 className="publicCardTitle">How to request deletion</h2>
            <ol className="publicOrderedList">
              <li>Open your email client and send a message to the address below.</li>
              <li>
                Use the subject line: <span className="mono">Account deletion request</span>
              </li>
              <li>
                Include your registered email and the words: <span className="mono">Please delete my account</span>
              </li>
            </ol>
            <p className="publicCardText">
              We may ask you to verify ownership of the account before processing the request.
            </p>
            <a className="publicLink" href="mailto:privacy@goldcrest.app?subject=Account%20deletion%20request">
              privacy@goldcrest.app
            </a>
          </article>

          <div className="publicCheckboxRow">
            <label className="publicCheckboxLabel">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="publicCheckbox"
              />
              <span>I understand that deletion is permanent and may not be reversible.</span>
            </label>
          </div>

          <div className="publicActionRow">
            <a
              className={`btn btn-danger ${acknowledged ? '' : 'btnDisabled'}`}
              href={
                acknowledged
                  ? 'mailto:privacy@goldcrest.app?subject=Account%20deletion%20request&body=Please%20delete%20my%20Goldcrest%20account.%0D%0ARegistered%20email%3A%20'
                  : undefined
              }
              onClick={(e) => {
                if (!acknowledged) e.preventDefault();
              }}
              aria-disabled={!acknowledged}
            >
              Email deletion request
            </a>
            <Link to="/support" className="btn publicGhostBtn">
              Back to support
            </Link>
          </div>
        </section>
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
