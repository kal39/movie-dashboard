"use client";
import React from "react";
import { sidebar } from "@/components/sidebar";
import { Trash2, ShieldCheck } from "lucide-react";
import { useMovieStore } from "@/store/useMovieStore";

export default function ArchivePage() {
  const { movies } = useMovieStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar p-12 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16">
            <p className="text-[#fb8500] font-mono text-[10px] uppercase tracking-[0.4em] mb-2">Secure_Storage</p>
            <h1 className="text-6xl font-black uppercase tracking-tighter">The <span className="text-[#fb8500]">Archive</span></h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {movies.slice(0, 4).map((movie) => (
              <div key={movie.imdbID} className="flex gap-8 bg-white/5 border border-white/5 p-8 rounded-[3rem] hover:bg-white/[0.08] transition-all group">
                <img src={movie.Poster} className="w-40 aspect-[2/3] object-cover rounded-[2rem] shadow-2xl transition-transform group-hover:scale-105" alt="" />
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 text-[#fb8500] mb-4">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified_Dossier</span>
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter leading-none text-[#ede0d4] mb-6">{movie.Title}</h3>
                  <div className="flex gap-4">
                    <button className="text-[10px] font-black uppercase py-2 px-4 bg-[#ede0d4] text-black rounded-lg">Open_File</button>
                    <button className="text-red-500/50 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}