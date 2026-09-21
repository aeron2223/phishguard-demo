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
    <div className="app">

      <div className="topbar">
        🎉 LIMITED-TIME GIVEAWAY 🎉
      </div>

      <main className="page">

        {/* =========================
            HOME
        ========================= */}

        {screen === "home" && (
          <section className="card">

            <div className="badge">
              🎁
            </div>

            <div className="eyebrow">
              EXCLUSIVE GIVEAWAY
            </div>

            <h1>
              You've Been Selected!
            </h1>

            <p className="lead">
              You have a chance to claim{" "}
              <strong>₱5,000</strong>.
            </p>

            <div className="prize">

              <span className="prize-icon">
                💸
              </span>

              <div>
                <small>
                  YOUR POTENTIAL PRIZE
                </small>

                <strong>
                  ₱5,000
                </strong>
              </div>

            </div>

            <div className="notice">

              <span>
                ⏱️
              </span>

              <div>
                <strong>
                  Limited-time verification
                </strong>

                <p>
                  Complete the short verification below to continue.
                </p>
              </div>

            </div>

            <button
              className="primary"
              onClick={() => setScreen("login")}
            >
              CLAIM MY PRIZE
            </button>

           

          </section>
        )}

        {/* =========================
            LOGIN / VERIFICATION
        ========================= */}

        {screen === "login" && (
          <section className="card">

            <div className="shield">
              🛡️
            </div>

            <div className="eyebrow">
              PRIZE VERIFICATION
            </div>

            <h1>
              Confirm Your Entry
            </h1>

            <p className="lead">
              Complete the <strong>verification</strong> below to confirm your giveaway entry.
            </p>

            <label>
              Your name

              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="off"
              />
            </label>

            <label>
              Your password

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
              />
            </label>

           

            {message && (
              <div className="error">
                {message}
              </div>
            )}

            <button
              className="primary"
              onClick={handleClaim}
              disabled={loading}
            >
              {loading ? "VERIFYING..." : "CONTINUE"}
            </button>

            <button
              className="text-button"
              onClick={() => setScreen("home")}
            >
              ← Back
            </button>

          </section>
        )}

        {/* =========================
            CHECKING
        ========================= */}

        {screen === "checking" && (
          <section className="card center">

            <div className="loader">
              ⏳
            </div>

            <div className="eyebrow">
              VERIFYING ENTRY
            </div>

            <h1>
              Checking your giveaway...
            </h1>

            <p className="lead">
              Please wait while we verify your entry.
            </p>

            <div className="verification-steps">

              <div>
                ✓ Checking entry information
              </div>

              <div>
                ✓ Confirming giveaway eligibility
              </div>

              <div>
                ✓ Processing verification
              </div>

            </div>

          </section>
        )}

        {/* =========================
            VERIFIED
        ========================= */}

        {screen === "verified" && (
          <section className="card center">

            <div className="reveal-icon">
              🎉
            </div>

            <div className="eyebrow">
              VERIFICATION COMPLETE
            </div>

            <h1>
              Congratulations! 🎉
            </h1>

            <p className="lead">
              Your giveaway entry has been successfully verified.
            </p>

            <div className="reveal-box">

              <strong>
                Your entry is confirmed!
              </strong>

              <p>
                You have successfully completed the verification
                process.
              </p>

              <p>
                Your <strong>₱5,000 prize</strong> is now being
                prepared.
              </p>

            </div>

            <div className="safe-list">

              <div>
                ✅ Giveaway entry confirmed
              </div>

              <div>
                ✅ Eligibility verified
              </div>

              <div>
                ✅ Verification completed
              </div>

            </div>

            <button
              className="primary"
              onClick={() => setScreen("reveal")}
            >
              CONTINUE
            </button>

          </section>
        )}

        {/* =========================
            PRANK REVEAL
        ========================= */}

        {screen === "reveal" && (
          <section className="card">

            <div className="reveal-icon">
              🛡️
            </div>

            <div className="eyebrow red">
              PHISHING SIMULATION
            </div>

            <h1>
              You Got Pranked! 😂
            </h1>

            <div className="reveal-box">

              <strong>
                This was a cybersecurity awareness simulation.
              </strong>

              <p>
                The giveaway was designed to demonstrate how
                clickbait prize pages can pressure people into
                entering credentials.
              </p>

            </div>

            <div className="safe-list">

              <div>
                ✅ The actual password was not stored.
              </div>

              <div>
                ✅ Only the demonstration value was recorded.
              </div>

              <div>
                ✅ Never reuse real passwords on unfamiliar sites.
              </div>

            </div>

            <button
              className="primary"
              onClick={reset}
            >
              TRY AGAIN
            </button>

          </section>
        )}

      </main>

      <footer>
        <strong>PhishGuard</strong>
        {" "}• School Demo • Passwords are never stored
      </footer>

    </div>
  );
}