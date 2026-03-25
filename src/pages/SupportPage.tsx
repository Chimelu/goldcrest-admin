import { Link } from 'react-router-dom';

export default function SupportPage() {
  return (
    <div className="publicPage">
      <header className="publicTopBar">
        <Link to="/users" className="publicBrand">
          Goldcrest
        </Link>
        <nav className="publicTopNav">
          <Link to="/support" className="publicTopLink active">
            Support
          </Link>
          <Link to="/delete-account" className="publicTopLink">
            Delete account
          </Link>
        </nav>
      </header>

      <div className="publicInner">
        <section className="publicHero">
          <p className="publicEyebrow">Help center</p>
          <h1 className="publicTitle">How can we help?</h1>
          <p className="publicLead">
            Find answers about trading, your wallet, withdrawals, and account security. If something is not
            covered here, reach out and we will get back to you.
          </p>
        </section>

        <section className="publicGrid">
          <article className="publicCard">
            <h2 className="publicCardTitle">Contact us</h2>
            <p className="publicCardText">
              For account-specific issues, include your registered email and a short description of the
              problem.
            </p>
            <a className="publicLink" href="mailto:support@goldcrest.app">
              support@goldcrest.app
            </a>
            <p className="publicCardMeta">Typical reply time: 1–2 business days</p>
          </article>

          <article className="publicCard">
            <h2 className="publicCardTitle">Trading &amp; balances</h2>
            <ul className="publicList">
              <li>Buy and sell execute at live market prices at the time of the request.</li>
              <li>USD balance and crypto holdings sync with your in-app wallet after each trade.</li>
              <li>If a feature is disabled for your account, an administrator must enable it.</li>
            </ul>
          </article>

          <article className="publicCard">
            <h2 className="publicCardTitle">Withdrawals</h2>
            <ul className="publicList">
              <li>Withdrawal requests are reviewed by our team.</li>
              <li>Keep your destination address and network accurate; incorrect details may delay processing.</li>
              <li>You can track request status from the wallet screen in the mobile app.</li>
            </ul>
          </article>

          <article className="publicCard">
            <h2 className="publicCardTitle">Security tips</h2>
            <ul className="publicList">
              <li>Never share your password or one-time codes with anyone.</li>
              <li>We will never ask for your full password over email.</li>
              <li>Use a unique password and enable device security on your phone.</li>
            </ul>
          </article>
        </section>

        <section className="publicBand">
          <div>
            <h2 className="publicBandTitle">Need to close your account?</h2>
            <p className="publicBandText">
              Review what deletion means and how to request it on our dedicated page.
            </p>
          </div>
          <Link to="/delete-account" className="btn publicBandBtn">
            Delete account info
          </Link>
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
