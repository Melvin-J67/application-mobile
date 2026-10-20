const BASE = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p/";

export async function tmdb(path, params = {}) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) throw new Error("Missing VITE_TMDB_TOKEN. Add it to your .env file.");
  const query = new URLSearchParams(params);
  const headers = { accept: "application/json" };
  if (/^[a-f\d]{32}$/i.test(token)) {
    query.set("api_key", token);
  } else {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}?${query}`, {
    headers,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// Movies use title/release_date; TV uses name/first_air_date. Normalise both.
export function normalise(item, type) {
  const t = type || item.media_type;
  const date = item.release_date || item.first_air_date || "";
  return {
    id: item.id,
    type: t,
    title: item.title || item.name || "Untitled",
    poster: item.poster_path ? IMG + "w500" + item.poster_path : null,
    year: date ? date.slice(0, 4) : "N/A",
    rating: item.vote_average ? item.vote_average.toFixed(1) : null,
  };
}

// Trending/search return people too; keep only movies and TV.
export const keepPlayable = (r) => r.media_type === undefined || r.media_type === "movie" || r.media_type === "tv";
