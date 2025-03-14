import './App.css'

function App() {
  return (
    <>
      <section className="section hero-section">
        <div className="hero-text">
          EVERYTHING<br/>
          YOU ARE.<br/>
          IN ONE,<br/>
          SIMPLE LINK
        </div>
        <div className="hero-subtext">
          the linktree alternative<br/>
          for the next billion people<br/>
          linkhub.near/yourname.near
        </div>
      </section>

      <section className="section input-section">
        <div className="input-container">
          <input
            type="text"
            className="text-input"
            placeholder="Enter your link..."
          />
          <button className="cta-button">Create Your Profile</button>
        </div>
      </section>

      <section className="section footer-section">
        <div className="social-links">
          <p><a href="https://sleet.near.page/" target="_blank" rel="noopener noreferrer">🔗 sleet.near.page</a></p>
          <p><a href="https://github.com/sleetplayground" target="_blank" rel="noopener noreferrer">🐱 github.com/sleetplayground</a></p>
          <p><a href="https://gitlab.com/sleet-dev" target="_blank" rel="noopener noreferrer">🦊 gitlab.com/sleet-dev</a></p>
          <p><a href="https://x.com/sleetname" target="_blank" rel="noopener noreferrer">𝕏 x.com/sleetname</a></p>
          <p><a href="https://sleet.near.social" target="_blank" rel="noopener noreferrer">〇 sleet.near.social</a></p>
          <p><a href="mailto:sleetdesign.nft@ud.me">✉️ sleetdesign.nft@ud.me</a></p>
        </div>
        <p className="copyright">copyright 2025 by SLEET.NEAR</p>
      </section>
    </>
  )
}

export default App
