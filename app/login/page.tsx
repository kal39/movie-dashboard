"use client";
import React from "react";
import { Fingerprint, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const forceRedirect = () => {
    window.location.href = "/welcome";
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#050505', 
      /* FIXED: Added missing commas below */
      backgroundImage: 'radial-gradient(circle, #fdc50e 0% , #fc6c0d 100%)',
      fontFamily: 'sans-serif',
      position: 'relative'
    }}>
      {/* LOGIN BOX */}
      <div style={{ 
        width: '400px', 
        backgroundColor: 'rgba(10, 10, 10, 0.95)', // Solid dark gray/black
        backdropFilter: 'blur(10px)',
        borderRadius: '24px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)', 
        overflow: 'hidden', 
        border: '1px solid rgba(251, 133, 0, 0.2)' // Faint orange rim to match your theme
      }}>
        <div style={{ backgroundColor: '#111', padding: '40px', textAlign: 'center', borderBottom: '1px solid #1a1a1a' }}>
          <Fingerprint size={40} color="#fb8500" style={{ marginBottom: '10px' }} />
          <h1 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>VAULT_LOGIN</h1>
        </div>
        
        <div style={{ padding: '30px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{display:'block', fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'5px'}}>PERSONNEL_ID</label>
            <input 
              type="email" 
              placeholder="agent@vault.com" 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#050505', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{display:'block', fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'5px'}}>ACCESS_KEY</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#050505', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>
          <button type="button" onClick={forceRedirect} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', padding: '16px', backgroundColor: '#fb8500', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 14px rgba(251, 133, 0, 0.3)' }}>
            Authorize Session <ArrowRight size={18} />
          </button>
          <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#333', fontSize: '10px', fontWeight: 'bold' }}>
            <ShieldCheck size={12} color="#5cb85c" /> 
            <span>SECURE_CONNECTION_ESTABLISHED</span>
          </div>
        </div>
      </div>
    </div>
  );
}