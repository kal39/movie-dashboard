"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useMovieStore } from "@/store/useMovieStore";
import { Database, Film, Tv, LogOut, ShieldAlert } from "lucide-react";

export const Sidebar = () => {
  const router = useRouter();
  const { typeFilter, setTypeFilter, logout } = useMovieStore();

  const handleTerminate = async () => {
    // 1. Clear local Zustand state
    logout();
    // 2. Clear Auth session and redirect to login
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { label: "All Vaults", value: "", icon: Database },
    { label: "Movies", value: "movie", icon: Film },
    { label: "Series", value: "series", icon: Tv },
  ];

  return (
    <aside className="w-64 bg-[#111] border-r border-white/5 p-8 flex flex-col h-full shrink-0">
      <div className="mb-12">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          THE <span className="text-[#fb8500]">VAULT</span>
        </h1>
        <div className="flex items-center gap-2 mt-1 opacity-30">
          <ShieldAlert size={10} className="text-[#fb8500]" />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">Encrypted_Session</span>
        </div>
      </div>

      <nav className="flex-1 space-y-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setTypeFilter(item.value)}
            className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all w-full text-left ${
              typeFilter === item.value ? "text-[#fb8500]" : "text-white/30 hover:text-white"
            }`}
          >
            <item.icon size={16} /> {item.label}
          </button>
        ))}
      </nav>

      {/* FUNCTIONAL TERMINATE BUTTON */}
      <button 
        onClick={handleTerminate}
        className="flex items-center gap-2 text-[10px] font-black text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-colors pt-6 border-t border-white/5"
      >
        <LogOut size={14} /> 
        Terminate_Session
      </button>
    </aside>
  );
};