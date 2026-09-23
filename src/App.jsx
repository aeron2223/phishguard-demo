import React, { useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClaim() {
    setMessage("");

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      if (!supabase) {
        setMessage(
          "Supabase is not configured. Check your .env file and restart Vite."
        );
        setLoading(false);
        return;
      }

      // Fixed demonstration value.
      // The password typed into the form is NOT stored.
      const DEMO_PASSWORD = "DEMO-12345";

      const { error } = await supabase
        .from("profiles")
        .insert({
          name: name.trim(),
          demo_password: DEMO_PASSWORD,
        });

      if (error) {
        console.error("Supabase error:", error);
        setMessage(`Supabase error: ${error.message}`);
        setLoading(false);
        return;
      }

      // Clear the password from the browser state.
      setPassword("");

      // Show verification/loading screen.
      setScreen("checking");

      // Simulate a realistic verification process.
      setTimeout(() => {
        setScreen("verified");
        setLoading(false);
      }, 3500);

    } catch (error) {
      console.error("Application error:", error);
      setMessage("Something went wrong. Check the browser console.");
      setLoading(false);
    }
  }

  function reset() {
    setScreen("home");
    setName("");
    setPassword("");
    setMessage("");
    setLoading(false);
  }

  return (
  <div className={`app screen-${screen}`}>

    {/* =========================
        BACKGROUND
    ========================= */}
    <div className="ambient ambient-1"></div>
    <div className="ambient ambient-2"></div>
    <div className="grid-overlay"></div>

    {/* =========================
        TOP NAV
    ========================= */}
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">P</div>

        <div>
          <strong>PhishGuard</strong>
          <span>Cybersecurity Awareness Lab</span>
        </div>
      </div>

      <div className="top-status">
        <span className="status-dot"></span>
        SIMULATION MODE
      </div>
    </header>

    {/* =========================
        MAIN
    ========================= */}
    <main className="page">

      {/* =========================
          HOME
      ========================= */}
      {screen === "home" && (
        <section className="hero-layout">

          <div className="hero-copy">

            <div className="mini-badge">
              <span>✦</span>
              LIMITED-TIME SIMULATION
            </div>

            <h1>
              You've Been
              <span> Selected.</span>
            </h1>

            <p className="hero-description">
              A premium-looking giveaway experience designed
              for a cybersecurity awareness demonstration.
            </p>

            <div className="hero-stats">

              <div>
                <strong>₱5,000</strong>
                <span>SIMULATED REWARD</span>
              </div>

              <div>
                <strong>01</strong>
                <span>VERIFICATION</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>DEMO ENVIRONMENT</span>
              </div>

            </div>

            <div className="trust-row">
              <span>🔒 Awareness Demo</span>
              <span>⚡ Interactive</span>
              <span>🎓 Classroom Project</span>
            </div>

          </div>

          {/* PREMIUM REWARD CARD */}
          <div className="reward-wrapper">

            <div className="floating-card floating-card-one">
              <span>✓</span>
              Entry selected
            </div>

            <div className="floating-card floating-card-two">
              <span>⚡</span>
              Limited access
            </div>

            <section className="card premium-card">

              <div className="card-top">

                <div className="card-icon">
                  🎁
                </div>

                <div className="live-pill">
                  <span></span>
                  LIVE
                </div>

              </div>

              <div className="eyebrow">
                EXCLUSIVE REWARD
              </div>

              <h2>
                Claim your
                <br />
                <span>₱5,000</span>
              </h2>

              <p className="card-description">
                Your entry has been selected for this
                limited-time demonstration.
              </p>

              <div className="money-card">

                <div className="money-symbol">
                  ₱
                </div>

                <div>
                  <small>POTENTIAL REWARD</small>
                  <strong>₱5,000</strong>
                </div>

                <div className="verified-check">
                  ✓
                </div>

              </div>

              <div className="verification-preview">

                <div className="preview-icon">
                  🛡️
                </div>

                <div>
                  <strong>Verification required</strong>
                  <span>
                    Complete the demonstration flow
                    to continue.
                  </span>
                </div>

              </div>

              <button
                className="primary premium-button"
                onClick={() => setScreen("login")}
              >
                <span>BEGIN VERIFICATION</span>
                <span className="button-arrow">→</span>
              </button>

              <div className="card-footer-note">
                🔐 Cybersecurity awareness simulation
              </div>

            </section>
          </div>

        </section>
      )}

      {/* =========================
          LOGIN / VERIFICATION
      ========================= */}
      {screen === "login" && (
        <section className="center-layout">

          <div className="progress-header">

            <div className="progress-step active">
              <span>01</span>
              DETAILS
            </div>

            <div className="progress-line active"></div>

            <div className="progress-step">
              <span>02</span>
              VERIFY
            </div>

            <div className="progress-line"></div>

            <div className="progress-step">
              <span>03</span>
              RESULT
            </div>

          </div>

          <section className="card form-card">

            <div className="form-icon">
              🛡️
            </div>

            <div className="eyebrow">
              PRIZE VERIFICATION
            </div>

            <h1>
              Confirm Your Entry
            </h1>

            <p className="lead">
              Complete this demonstration verification
              to continue.
            </p>

            <div className="secure-banner">
              <div>🔒</div>

              <div>
                <strong>Simulation environment</strong>
                <span>
                  This page is part of a cybersecurity
                  awareness demonstration.
                </span>
              </div>
            </div>

            <label>
              <span>
                YOUR NAME
              </span>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
              </div>
            </label>

            <label>
              <span>
                DEMO PASSWORD
              </span>

              <div className="input-wrapper">
                <span>🔑</span>

                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Use the demo password"
                  autoComplete="new-password"
                />
              </div>
            </label>

            {message && (
              <div className="error">
                <span>!</span>
                {message}
              </div>
            )}

            <button
              className="primary premium-button"
              onClick={handleClaim}
              disabled={loading}
            >
              <span>
                {loading ? "VERIFYING..." : "CONTINUE"}
              </span>

              <span>
                →
              </span>
            </button>

            <button
              className="text-button"
              onClick={() => setScreen("home")}
            >
              ← Return to reward
            </button>

          </section>

          <div className="bottom-security">
            <span>🔒 SIMULATION</span>
            <span>•</span>
            <span>NO REAL PASSWORD STORAGE</span>
          </div>

        </section>
      )}

      {/* =========================
          CHECKING
      ========================= */}
      {screen === "checking" && (
        <section className="center-layout">

          <section className="card checking-card">

            <div className="scan-circle">

              <div className="scan-inner">
                🛡️
              </div>

            </div>

            <div className="live-pill centered">
              <span></span>
              PROCESSING
            </div>

            <div className="eyebrow">
              VERIFICATION ENGINE
            </div>

            <h1>
              Checking Your Entry
            </h1>

            <p className="lead">
              Please wait while the demonstration
              processes your submission.
            </p>

            <div className="progress-bar">
              <div></div>
            </div>

            <div className="verification-list">

              <div className="verification-item done">
                <span>✓</span>
                <div>
                  <strong>Entry information</strong>
                  <small>Checked</small>
                </div>
              </div>

              <div className="verification-item done">
                <span>✓</span>
                <div>
                  <strong>Eligibility status</strong>
                  <small>Confirmed</small>
                </div>
              </div>

              <div className="verification-item processing">
                <span>◌</span>
                <div>
                  <strong>Processing verification</strong>
                  <small>In progress...</small>
                </div>
              </div>

            </div>

            <div className="processing-note">
              ⚡ Please do not close this window.
            </div>

          </section>

        </section>
      )}

      {/* =========================
          VERIFIED
      ========================= */}
      {screen === "verified" && (
        <section className="center-layout">

          <section className="card success-card">

            <div className="success-glow"></div>

            <div className="success-icon">
              ✓
            </div>

            <div className="live-pill success-pill">
              <span></span>
              VERIFIED
            </div>

            <div className="eyebrow">
              VERIFICATION COMPLETE
            </div>

            <h1>
              You're All Set! 🎉
            </h1>

            <p className="lead">
              Your simulated giveaway entry has
              successfully passed verification.
            </p>

            <div className="success-reward">

              <small>SIMULATED REWARD</small>

              <strong>
                ₱5,000
              </strong>

              <span>
                Entry successfully confirmed
              </span>

            </div>

            <div className="safe-list">

              <div>
                <span>✓</span>
                Giveaway entry confirmed
              </div>

              <div>
                <span>✓</span>
                Eligibility verified
              </div>

              <div>
                <span>✓</span>
                Verification completed
              </div>

            </div>

            <button
              className="primary premium-button"
              onClick={() => setScreen("reveal")}
            >
              <span>VIEW RESULT</span>
              <span>→</span>
            </button>

          </section>

        </section>
      )}

      {/* =========================
          PRANK REVEAL
      ========================= */}
      {screen === "reveal" && (
        <section className="center-layout">

          <section className="card reveal-card">

            <div className="reveal-glow"></div>

            <div className="warning-icon">
              ⚠
            </div>

            <div className="eyebrow red">
              CYBERSECURITY AWARENESS
            </div>

            <h1>
              You Got
              <span> Pranked! 😂</span>
            </h1>

            <p className="lead">
              The giveaway was a controlled
              cybersecurity simulation.
            </p>

            <div className="simulation-banner">

              <div className="simulation-logo">
                P
              </div>

              <div>
                <strong>
                  PHISHGUARD SIMULATION
                </strong>

                <span>
                  Classroom cybersecurity demonstration
                </span>
              </div>

            </div>

            <div className="reveal-box">

              <strong>
                What just happened?
              </strong>

              <p>
                This demonstration shows how convincing
                reward-based pages can encourage people
                to trust unfamiliar websites.
              </p>

            </div>

            <div className="lesson-grid">

              <div>
                <span>01</span>
                <strong>Think first</strong>
                <small>
                  Don't trust unexpected rewards.
                </small>
              </div>

              <div>
                <span>02</span>
                <strong>Check the URL</strong>
                <small>
                  Verify the website before entering information.
                </small>
              </div>

              <div>
                <span>03</span>
                <strong>Protect credentials</strong>
                <small>
                  Never reuse passwords on unfamiliar sites.
                </small>
              </div>

            </div>

            <div className="safe-list reveal-safe">

              <div>
                <span>✓</span>
                No real password was stored
              </div>

              <div>
                <span>✓</span>
                Demonstration value only
              </div>

              <div>
                <span>✓</span>
                Built for cybersecurity awareness
              </div>

            </div>

            <button
              className="primary premium-button"
              onClick={reset}
            >
              <span>RUN SIMULATION AGAIN</span>
              <span>↻</span>
            </button>

          </section>

        </section>
      )}

    </main>

    {/* =========================
        FOOTER
    ========================= */}
    <footer className="site-footer">

      <div>
        <strong>PhishGuard</strong>
        <span>Cybersecurity Awareness Lab</span>
      </div>

      <div className="footer-right">
        <span>EDUCATIONAL SIMULATION</span>
        <span>•</span>
        <span>NO REAL PASSWORD STORAGE</span>
      </div>

    </footer>

  </div>
);
}