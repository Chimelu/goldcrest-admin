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
            Goldcrest helps you follow the market: live crypto prices, charts, and news. It is not a trading or
            brokerage app. If something looks wrong or you need help with your account, reach out and we will
            get back to you.
          </p>
        </section>

        <section className="publicGrid">
          <article className="publicCard">
            <h2 className="publicCardTitle">Contact us</h2>
            <p className="publicCardText">
              For account-specific issues, include your registered email and a short description of the
              problem (for example: price not updating, chart not loading, or sign-in trouble).
            </p>
            <a className="publicLink" href="mailto:support@goldcrest.app">
              support@goldcrest.app
            </a>
            <p className="publicCardMeta">Typical reply time: 1–2 business days</p>
          </article>

          <article className="publicCard">
            <h2 className="publicCardTitle">Prices &amp; charts</h2>
            <ul className="publicList">
              <li>Prices and chart data come from third-party market data providers and may be delayed.</li>
              <li>Pull to refresh or reopen the app if a quote has not updated recently.</li>
              <li>Display issues (wrong asset, blank chart) are often fixed after an app update—contact us if they persist.</li>
            </ul>
          </article>

          <article className="publicCard">
            <h2 className="publicCardTitle">News</h2>
            <ul className="publicList">
              <li>News headlines and summaries are for information only, not financial advice.</li>
              <li>We do not endorse any token, project, or outlet mentioned in the feed.</li>
              <li>Report broken links or misleading summaries so we can review the source.</li>
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
