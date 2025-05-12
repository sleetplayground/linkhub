import './App.css'
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ProfilePage from './pages/ProfilePage'

function HomePage() {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountId.trim()) {
      navigate(`/${accountId.toLowerCase()}`);
    }
  };

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
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              placeholder="Enter your NEAR account..."
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            />
            <button type="submit" className="cta-button">View Profile</button>
          </div>
          <a href="https://near.social/" target="_blank" rel="noopener noreferrer" className="create-profile-link">Create your profile</a>
        </form>
      </section>

      <section className="section footer-section">
        <p className="copyright">copyright 2025 by SLEET.NEAR</p>
      </section>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:accountId" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
