import { useEffect, useState } from "react";
import { Box, Chip, Pagination, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { normalise } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import { Empty, ErrorMessage, Loader } from "../components/StatusMessages";

// Shared by /movies and /tv: genre filter + pagination
export default function Browse({ type }) {
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => { setGenre(""); setPage(1); }, [type]);

  const genres = useFetch(`/genre/${type}/list`);
  const { data, loading, error } = useFetch(`/discover/${type}`, {
    sort_by: "popularity.desc", page, ...(genre && { with_genres: genre }),
  });
  const items = data ? data.results.map((r) => normalise(r, type)) : [];
  const pick = (g) => { setGenre(g); setPage(1); };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>{type === "movie" ? "Movies" : "TV Shows"}</Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        <Chip label="All" color={genre === "" ? "primary" : "default"} onClick={() => pick("")} />
        {genres.data?.genres.map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? "primary" : "default"} onClick={() => pick(g.id)} />
        ))}
      </Box>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && <Empty>No titles found for this genre.</Empty>}
      {!loading && !error && <MovieGrid items={items} />}
      {data && data.total_pages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination page={page} count={Math.min(data.total_pages, 500)} color="primary" siblingCount={0}
            onChange={(_, p) => { setPage(p); window.scrollTo(0, 0); }} />
        </Box>
      )}
    </>
  );
}
