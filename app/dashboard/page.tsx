"use client";
import React, { useState, useEffect } from "react";
import { 
  Search, Loader2, Database, LogOut, Archive, ShieldCheck, 
  ChevronRight, Info, Plus, X, Trash2, ArrowLeft, Tag, Activity, Layers, Filter, Award, User, Globe
} from "lucide-react";

export default function DashboardPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All"); 
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("feed"); 
  const [archivedMovies, setArchivedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFullDossier, setIsFullDossier] = useState(false);

  const MY_API_KEY = "b5c1364d"; 
  const genres = ["Action", "Sci-Fi", "Drama", "Thriller", "Horror", "Comedy", "Crime", "Mystery"];

  const handleLogout = () => { window.location.href = "/login"; };
  const addToArchive = (movie: any) => { if (!archivedMovies.find(m => m.imdbID === movie.imdbID)) { setArchivedMovies([...archivedMovies, movie]); } };
  const removeFromArchive = (id: string) => { setArchivedMovies(archivedMovies.filter(m => m.imdbID !== id)); };

  const fetchVaultData = async (searchQuery: string, genreFilter: string = "All") => {
    setLoading(true);
    setView("feed"); 
    const finalSearch = searchQuery || "Batman"; 
    try {
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(finalSearch)}&apikey=${MY_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        const detailPromises = data.Search.slice(0, 10).map((m: any) => 
          fetch(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=${MY_API_KEY}`).then(r => r.json())
        );
        const detailedMovies = await Promise.all(detailPromises);
        if (genreFilter !== "All") {
          const filtered = detailedMovies.filter(m => m.Genre && m.Genre.toLowerCase().includes(genreFilter.toLowerCase()));
          setMovies(filtered);
        } else { setMovies(detailedMovies); }
      } else { setMovies([]); }
    } catch (err) { console.error("Vault failure"); } finally { setLoading(false); }
  };

  const openModal = (movie: any, full: boolean) => {
    setSelectedMovie(movie);
    setIsFullDossier(full);
  };

  useEffect(() => { fetchVaultData(""); }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#050505', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* SIDEBAR */}
      {view === "feed" && (
        <aside style={{ width: '260px', backgroundColor: '#0a0a0a', borderRight: '1px solid #1a1a1a', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#fb8500', letterSpacing: '1px', margin: 0 }}>THE VAULT</h1>
            <p style={{ fontSize: '9px', color: '#444', fontWeight: 'bold' }}>INTEL_INTERFACE_V4.0</p>
          </div>
          <nav style={{ flex: 1 }}>
            <div style={{ color: activeGenre !== "All" ? '#fb8500' : '#444', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={14} /> {activeGenre !== "All" ? `FILTERING: ${activeGenre.toUpperCase()}` : "ACTIVE_DATABASE"}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button onClick={() => fetchVaultData(query, "All")} style={{ background: activeGenre === "All" ? 'rgba(251,133,0,0.1)' : 'none', border: 'none', color: activeGenre === "All" ? '#fb8500' : '#555', cursor: 'pointer', textAlign: 'left', fontSize: '11px', padding: '10px', borderRadius: '4px' }}>SHOW ALL</button>
              {genres.map(g => (
                <button key={g} onClick={() => { setActiveGenre(g); fetchVaultData(query, g); }} style={{ background: activeGenre === g ? 'rgba(251,133,0,0.1)' : 'none', border: 'none', color: activeGenre === g ? '#fb8500' : '#555', cursor: 'pointer', textAlign: 'left', fontSize: '11px', padding: '10px', borderRadius: '4px' }}>{g.toUpperCase()}</button>
              ))}
            </div>
          </nav>
        </aside>
      )}

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: '70px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: '#0a0a0a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             {view === "archive" && (
               <button onClick={() => setView("feed")} style={{ background: '#fb8500', border: 'none', color: 'black', padding: '8px 15px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>EXIT_ARCHIVE</button>
             )}
             <div style={{ color: '#5cb85c', fontSize: '10px', fontWeight: 'bold' }}>ENCRYPTION_STABLE</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 25 }}>
            <button onClick={() => setView("archive")} style={{ background: 'none', border: 'none', color: view === 'archive' ? '#fb8500' : '#ccc', cursor: 'pointer', fontSize: '11px' }}>ARCHIVE [{archivedMovies.length}]</button>
            <button onClick={handleLogout} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: '900', cursor: 'pointer' }}>TERMINATE</button>
          </div>
        </header>

        <div style={{ padding: '40px', overflowY: 'auto', flex: 1 }}>
          {view === "feed" ? (
            <>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <input type="text" placeholder="Scan global records..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchVaultData(query, activeGenre)} style={{ flex: 1, padding: '16px', backgroundColor: '#0f0f0f', border: '1px solid #222', borderRadius: '8px', color: 'white' }} />
                <button onClick={() => fetchVaultData(query, activeGenre)} style={{ padding: '0 30px', backgroundColor: '#fb8500', borderRadius: '8px', fontWeight: '900', border: 'none', cursor: 'pointer' }}>EXECUTE SCAN</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
                {movies.map((m: any, index: number) => (
                  /* FIX: Unique key using imdbID and index */
                  <div key={`${m.imdbID}-${index}`} className="movie-card">
                    <img src={m.Poster} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                    <div className="card-overlay">
                      <button onClick={() => openModal(m, false)} className="btn-details">QUICK_SCAN</button>
                      <button onClick={() => addToArchive(m)} className="btn-archive"><Plus size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px', borderLeft: '5px solid #fb8500', paddingLeft: '20px' }}>ARCHIVE_MANIFEST</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {archivedMovies.map((m, index) => (
                        <div key={`archive-${m.imdbID}-${index}`} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '15px', overflow: 'hidden', display: 'flex' }}>
                             <img src={m.Poster} style={{ width: '150px', height: '220px', objectFit: 'cover' }} />
                             <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>{m.Title}</h3>
                                    <p style={{ fontSize: '10px', color: '#fb8500' }}>{m.Year} • {m.Type.toUpperCase()}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => openModal(m, true)} style={{ flex: 1, background: '#fb8500', color: 'black', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '10px', cursor: 'pointer' }}>VIEW_FULL_DOSSIER</button>
                                    <button onClick={() => removeFromArchive(m.imdbID)} style={{ background: '#1a1a1a', border: '1px solid #ff4444', color: '#ff4444', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
          )}
        </div>
      </main>

      {selectedMovie && (
        <div className="modal-bg" onClick={() => setSelectedMovie(null)}>
           <div className={isFullDossier ? "modal-full" : "modal-small"} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', flexDirection: isFullDossier ? 'row' : 'column' }}>
                <img src={selectedMovie.Poster} style={{ width: isFullDossier ? '40%' : '100%', height: isFullDossier ? 'auto' : '220px', objectFit: 'cover' }} />
                <div style={{ padding: '30px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h2 style={{ color: '#fb8500', fontSize: isFullDossier ? '28px' : '18px', margin: 0 }}>{selectedMovie.Title}</h2>
                    <button onClick={() => setSelectedMovie(null)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}><X /></button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                    <span style={{ color: '#5cb85c', border: '1px solid #5cb85c', padding: '2px 8px', fontSize: '10px' }}>{selectedMovie.imdbRating}</span>
                    {/* GENRE preserved for both views */}
                    <span style={{ color: '#fb8500', border: '1px solid #fb8500', padding: '2px 8px', fontSize: '10px' }}>{selectedMovie.Genre?.toUpperCase()}</span>
                    {isFullDossier && <span style={{ color: '#aaa', border: '1px solid #444', padding: '2px 8px', fontSize: '10px' }}>{selectedMovie.Runtime}</span>}
                  </div>

                  <p style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.6' }}>{selectedMovie.Plot}</p>

                  {isFullDossier && (
                    <div style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="intel-box">
                                <label><User size={12}/> DIRECTOR</label>
                                <span>{selectedMovie.Director}</span>
                            </div>
                            <div className="intel-box">
                                <label><Award size={12}/> AWARDS</label>
                                <span>{selectedMovie.Awards}</span>
                            </div>
                            <div className="intel-box" style={{ gridColumn: '1 / span 2' }}>
                                <label><Activity size={12}/> STARRING</label>
                                <span>{selectedMovie.Actors}</span>
                            </div>
                        </div>
                    </div>
                  )}
                  
                  <button onClick={() => setSelectedMovie(null)} style={{ width: '100%', padding: '14px', background: isFullDossier ? 'none' : '#fb8500', border: isFullDossier ? '1px solid #fb8500' : 'none', color: isFullDossier ? '#fb8500' : 'black', fontWeight: 'bold', marginTop: '30px', cursor: 'pointer' }}>
                    {isFullDossier ? "CLOSE_FILE" : "ACKNOWLEDGE"}
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .movie-card { background: #0a0a0a; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid #1a1a1a; transition: 0.3s; cursor: pointer; }
        .card-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; flex-direction:column; justify-content:center; align-items:center; gap:12px; opacity:0; transition:0.3s; }
        .movie-card:hover .card-overlay { opacity:1; }
        .btn-details { background:#fb8500; border:none; padding:10px 20px; font-size:10px; font-weight:bold; cursor:pointer; border-radius: 4px; }
        .btn-archive { background:none; border:1px solid #444; color:white; padding:10px 20px; font-size:10px; cursor:pointer; border-radius: 4px; }
        .modal-bg { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); display:flex; align-items:center; justify-content:center; z-index:1000; padding: 20px; }
        .modal-small { background:#111; width:400px; border-radius:12px; overflow:hidden; border:1px solid #333; }
        .modal-full { background:#0a0a0a; width:900px; max-height: 90vh; border-radius:4px; overflow-y:auto; border: 1px solid #fb8500; }
        .intel-box label { font-size: 9px; color: #444; font-weight: bold; display: flex; align-items: center; gap: 5px; margin-bottom: 4px; }
        .intel-box span { font-size: 12px; color: #eee; }
      `}</style>
    </div>
  );
}