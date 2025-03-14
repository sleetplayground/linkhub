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
          <p>🔗 https://sleet.near.page/</p>
          <p>🐱 https://github.com/sleetplayground</p>
          <p>🦊 https://gitlab.com/sleet-dev</p>
          <p>𝕏 https://x.com/sleetname</p>
          <p>〇 https://sleet.near.social</p>
          <p>✉️ sleetdesign.nft@ud.me</p>
        </div>
        <p className="copyright">copyright 2025 by SLEET.NEAR</p>
      </section>
    </>
  )
}

export default App
