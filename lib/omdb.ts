import { Movie, OMDBResponse } from "@/types/movie";

export async function getMovies(query: string, type: string = ""): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=${type}`;
  
  try {
    const res = await fetch(url);
    const data: OMDBResponse = await res.json();
    return data.Search || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}