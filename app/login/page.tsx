"use client";
import React, { useState } from "react";
import { Fingerprint, ArrowRight, ShieldCheck, UserPlus } from "lucide-react";
import { auth } from "./firebase"; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); 
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) return alert("CREDENTIALS REQUIRED");
    setLoading(true);
    
    try {
      if (isRegistering) {
      
        await createUserWithEmailAndPassword(auth, email, password);
        alert("ACCESS GRANTED: Account Created");
      } else {
        
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/welcome");
    } catch (error: any) {
      alert("AUTH_ERROR: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      backgroundColor: '#050505', backgroundImage: 'radial-gradient(circle, #fdc50e 0% , #fc6c0d 100%)',
      fontFamily: 'sans-serif', position: 'relative'
    }}>
      <div style={{ 
        width: '400px', backgroundColor: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)',
        borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', overflow: 'hidden', border: '1px solid rgba(251, 133, 0, 0.2)' 
      }}>
        <div style={{ backgroundColor: '#111', padding: '40px', textAlign: 'center', borderBottom: '1px solid #1a1a1a' }}>
          <Fingerprint size={40} color="#fb8500" style={{ marginBottom: '10px' }} />
          <h1 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>
            {isRegistering ? "CREATE_IDENTITY" : "VAULT_LOGIN"}
          </h1>
        </div>
        
        <div style={{ padding: '30px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{display:'block', fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'5px'}}>PERSONNEL_ID</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@vault.com" 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#050505', color: '#fff', outline: 'none' }} 
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{display:'block', fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'5px'}}>ACCESS_KEY</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#050505', color: '#fff', outline: 'none' }} 
            />
          </div>

          <button onClick={handleAuth} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', padding: '16px', backgroundColor: '#fb8500', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? "PROCESSING..." : isRegistering ? "Register Agent" : "Authorize Session"} 
            {isRegistering ? <UserPlus size={18}/> : <ArrowRight size={18} />}
          </button>

          <p 
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: '#fb8500', fontSize: '11px', textAlign: 'center', marginTop: '15px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isRegistering ? "ALREADY HAVE ACCESS? LOGIN" : "NEW AGENT? CREATE ACCOUNT"}
          </p>

          <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#333', fontSize: '10px', fontWeight: 'bold' }}>
            <ShieldCheck size={12} color="#5cb85c" /> 
            <span>SECURE_CONNECTION_ESTABLISHED</span>
          </div>
        </div>
      </div>
    </div>
  );
}