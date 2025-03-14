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
        </div>
      </section>

      <section className="section footer-section">
        <p className="footer-text">Built on NEAR</p>
        <button className="cta-button">Create Your Profile</button>
      </section>
    </>
  )
}

export default App
