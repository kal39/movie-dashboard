import { create } from "zustand";

export const useMovieStore = create((set) => ({
  movies: [],
  searchQuery: "Batman",
  typeFilter: "",
  loading: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTypeFilter: (type) => set({ typeFilter: type }),
  fetchMovies: async (query, type) => {
    set({ loading: true });
    // USING YOUR API KEY DIRECTLY TO ENSURE IT WORKS
    const apiKey = "8841440d"; 
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&type=${type}&apikey=${apiKey}`);
      const data = await res.json();
      set({ movies: data.Search || [], loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },
}));