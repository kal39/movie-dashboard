"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Activity, Fingerprint, Lock, Unlock, Cpu } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const [stage, setStage] = useState("WAITING"); // WAITING, SCANNING, ACCESS_GRANTED
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const systemLogs = [
    "Establishing secure link...",
    "Bypassing firewall nodes...",
    "Decrypting RSA_4096 layer...",
    "Verifying agent signature...",
    "Accessing movie database...",
    "Syncing archive manifest...",
    "Neural link stable."
  ];

  const startSequence = () => {
    setStage("SCANNING");
    let logIndex = 0;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStage("ACCESS_GRANTED");
          setTimeout(() => router.push("/dashboard"), 1200);
          return 100;
        }
        
        // Add a new log every 15% progress
        if (prev % 15 === 0 && logIndex < systemLogs.length) {
          setLogs(prevLogs => [...prevLogs, systemLogs[logIndex]]);
          logIndex++;
        }
        
        return prev + 1;
      });
    }, 40);
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#050505', color: '#fb8500', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
      
      {/* FIXED: zIndex (camelCase) and proper string quoting */}
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`, 
        backgroundSize: '50px 50px', 
        zIndex: 0, 
        opacity: 0.5 
      }}></div>

      <div style={{ zIndex: 1, textAlign: 'center', width: '400px' }}>
        
        {stage === "WAITING" && (
          <div className="fade-in">
            <Fingerprint size={80} style={{ marginBottom: '20px', opacity: 0.8 }} />
            <h2 style={{ letterSpacing: '4px', marginBottom: '30px' }}>BIOMETRIC_REQUIRED</h2>
            <button 
              onClick={startSequence}
              style={{ background: 'none', border: '1px solid #fb8500', color: '#fb8500', padding: '15px 40px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', transition: '0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(251,133,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              INITIATE_SCAN
            </button>
          </div>
        )}

        {stage !== "WAITING" && (
          <div className="fade-in">
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '40px' }}>
              {stage === "SCANNING" ? <Lock size={60} className="pulse" /> : <Unlock size={60} color="#5cb85c" />}
              <div className="scanner-line"></div>
            </div>

            <h2 style={{ letterSpacing: '5px', fontSize: '14px', margin: '20px 0' }}>
                {stage === "SCANNING" ? "DECRYPTING_VAULT" : "IDENTITY_CONFIRMED"}
            </h2>

            <div style={{ width: '100%', height: '4px', background: '#111', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: '#fb8500', boxShadow: '0 0 10px #fb8500', transition: 'width 0.1s linear' }}></div>
            </div>

            <div style={{ height: '100px', textAlign: 'left', borderLeft: '2px solid #222', paddingLeft: '20px' }}>
              {logs.slice(-4).map((log, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={10} /> {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .pulse { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

        .scanner-line { 
          position: absolute; 
          top: 0; 
          left: -20px; 
          width: 100px; 
          height: 2px; 
          background: #fb8500; 
          box-shadow: 0 0 15px #fb8500; 
          animation: scan 1.5s linear infinite; 
          display: ${stage === "SCANNING" ? 'block' : 'none'};
        }
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
      `}</style>
    </div>
  );
}