// components/poisoning/DataPoisoning.jsx
import React, { useState, useEffect, useRef } from "react";

export default function DataPoisoning() {
  const [prompt, setPrompt] = useState("Write a Python function that reverses a string.");
  const [maxNewTokens, setMaxNewTokens] = useState(160);
  const [temperature, setTemperature] = useState(0.2);
  const [numBeams, setNumBeams] = useState(4);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [showPoisonModal, setShowPoisonModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [okEnabled, setOkEnabled] = useState(false);
  const countdownRef = useRef(null);

  const [poisoning, setPoisoning] = useState(false);
  const [poisonStatus, setPoisonStatus] = useState(null);
  const [poisonCount, setPoisonCount] = useState(10); // User-selected count

  // Countdown logic for modal
  useEffect(() => {
    if (showPoisonModal) {
      setCountdown(10);
      setOkEnabled(false);
      if (countdownRef.current) clearInterval(countdownRef.current);

      countdownRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(countdownRef.current);
            setOkEnabled(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [showPoisonModal]);

  // Generate code API
  const submitGenerate = async () => {
    setLoading(true);
    setError("");
    setCode("");
    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, max_new_tokens: maxNewTokens, temperature, num_beams: numBeams }),
      });

      let data;
      try { data = await res.json(); } catch (err) { throw new Error(`Invalid JSON response: ${err.message}`); }
      if (!res.ok) throw new Error(data?.error || `Server error: ${res.status}`);
      setCode(data.code || "");
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  // Poisoning API
  const confirmPoison = async () => {
    setPoisoning(true);
    setPoisonStatus(null);
    setShowPoisonModal(false);

    try {
      const res = await fetch("http://localhost:8000/api/poison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "TPI", count: poisonCount, train_after: false }),
      });

      let data;
      try { data = await res.json(); } catch (err) { throw new Error(`Invalid JSON response: ${err.message}`); }
      if (!res.ok) throw new Error(data?.error || `Server error: ${res.status}`);

      setPoisonStatus({ ok: true, message: data.message || "Poisoning completed", details: data });
    } catch (e) {
      setPoisonStatus({ ok: false, message: String(e.message || e) });
    } finally {
      setPoisoning(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.page}>
        <div style={styles.header}>
          <h1 style={{ margin: 0 }}>Basic Python code Generator</h1>
          <div>
            <button style={styles.poisonBtn} onClick={() => setShowPoisonModal(true)}>⚠️ Data Poison</button>
          </div>
        </div>

        <div style={styles.container}>
          <label style={styles.label}>Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={6} style={styles.textarea} />

          <div style={{ display: "flex", gap: 12, marginTop: 12, alignItems: "center" }}>
            <div>
              <label style={styles.label}>max_new_tokens</label>
              <input type="number" value={maxNewTokens} onChange={(e) => setMaxNewTokens(+e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>temperature</label>
              <input type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(+e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>num_beams</label>
              <input type="number" value={numBeams} onChange={(e) => setNumBeams(+e.target.value)} style={styles.input} />
            </div>
            <button onClick={submitGenerate} disabled={loading} style={styles.primaryBtn}>
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>

          {error && <p style={{ color: "salmon" }}>{error}</p>}
          {code && (
            <div style={{ marginTop: 16 }}>
              <h3>Generated code</h3>
              <pre style={styles.codeBlock}>{code}</pre>
            </div>
          )}

          {poisonStatus && (
            <div style={{ marginTop: 20 }}>
              <h3>Poison status</h3>
              <div style={{ padding: 12, borderRadius: 8, background: "#0b1021" }}>
                <strong>{poisonStatus.ok ? "SUCCESS" : "ERROR"}</strong>
                <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{poisonStatus.message}</div>
              </div>
            </div>
          )}
        </div>

        {/* Poison Modal */}
        {showPoisonModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={{ marginTop: 0, color: "#9b111e" }}>Danger: Data Poisoning</h2>
              <p>You are about to inject poisoned data into the training set. Only proceed in a controlled environment.</p>
              <ul>
                <li>Generated model behavior may be unpredictable.</li>
                <li>Poisoning can introduce security vulnerabilities.</li>
                <li>Operation may take a long time depending on scripts.</li>
              </ul>

              <div style={{ marginTop: 12 }}>
                <label style={{ marginRight: 8 }}>Number of TPIs to poison:</label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={poisonCount}
                  onChange={(e) => setPoisonCount(Math.min(Math.max(1, +e.target.value), 1000))}
                  style={{ width: 80, padding: 6, borderRadius: 6, border: "1px solid #fff", background: "#0b1021", color: "#e9eef6" }}
                />
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={() => setShowPoisonModal(false)} style={styles.ghostBtn}>Cancel</button>
                <button
                  onClick={() => okEnabled && confirmPoison()}
                  disabled={!okEnabled}
                  style={okEnabled ? styles.confirmBtnEnabled : styles.confirmBtnDisabled}
                >
                  {okEnabled ? "OK — Poison now" : `OK (wait ${countdown}s)`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Poisoning loading overlay */}
        {poisoning && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingBox}>
              <h2>Poisoning with data...</h2>
              <p>Preparing poisoned dataset → running script → (optional) finetuning</p>
              <div style={styles.spinner} />
              <p style={{ opacity: 0.9 }}>This may take seconds to hours depending on options.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
    background: "", // outer background
  },
  page: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI'",
    padding: 24,
    color: "#e9eef6",
    background: "#0b1021", // inner page background
    borderRadius: 20,       // rounded corners
    border: "1px solid #fff", // thin white border
    maxWidth: 960,
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  container: { maxWidth: 960, margin: "0 auto" },
  label: { display: "block", marginBottom: 6, fontWeight: 700 },
  textarea: { width: "100%", background: "#2a3b4a", color: "#e9eef6", border: "1px solid #2a3b4a", padding: 12, borderRadius: 8, fontFamily: "monospace" },
  input: { padding: 8, width: 120, borderRadius: 8, background: "#2a3b4a", color: "#e9eef6", border: "1px solid #2a3b4a" },
  primaryBtn: { padding: "8px 14px", borderRadius: 8, background: "#16a34a", color: "#000", border: "none", cursor: "pointer", fontWeight: 700 },
  poisonBtn: { padding: "8px 14px", borderRadius: 8, background: "#9b111e", color: "#fff", border: "none", cursor: "pointer", fontWeight: 800 },
  ghostBtn: { padding: "8px 12px", borderRadius: 8, background: "#2a3b4a", color: "#bfc8d8", border: "1px solid #2a3b4a", cursor: "pointer" },
  confirmBtnDisabled: { padding: "8px 12px", borderRadius: 8, background: "#8b1016", color: "#ddd", border: "none", cursor: "not-allowed", opacity: 0.7 },
  confirmBtnEnabled: { padding: "8px 12px", borderRadius: 8, background: "#10b981", color: "#000", border: "none", cursor: "pointer", fontWeight: 700 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { width: 720, background: "#0b1021", padding: 24, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.6)", color: "#e9eef6", border: "1px solid #fff" },
  loadingOverlay: { position: "fixed", left: 0, right: 0, top: 0, bottom: 0, background: "rgba(4,6,12,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 },
  loadingBox: { width: 560, background: "#0b1021", padding: 28, borderRadius: 12, textAlign: "center", color: "#dff3df", border: "1px solid #fff" },
  spinner: { margin: "18px auto", width: 64, height: 64, borderRadius: "50%", border: "6px solid rgba(255,255,255,0.08)", borderTopColor: "#10b981", animation: "spin 1s linear infinite" },
  codeBlock: { background: "#0b1021", color: "#d6e7ff", padding: 12, borderRadius: 8, overflowX: "auto", border: "1px solid #fff" }
};

/* Add in global CSS:
@keyframes spin { to { transform: rotate(360deg); } }
*/
