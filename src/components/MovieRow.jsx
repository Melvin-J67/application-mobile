import { Box, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { keepPlayable, normalise } from "../api/tmdb";
import MovieCard from "./MovieCard";
import { Empty, ErrorMessage, Loader } from "./StatusMessages";

// Horizontal scrolling row used on the homepage
export default function MovieRow({ title, path, params, type }) {
  const { data, loading, error } = useFetch(path, params);
  const items = data ? data.results.filter(keepPlayable).map((r) => normalise(r, type)) : [];
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && <Empty>Nothing to show here yet.</Empty>}
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {items.map((it) => (
          <MovieCard key={`${it.type}-${it.id}`} item={it} width={{ xs: 130, sm: 160, md: 180 }} />
        ))}
      </Box>
    </Box>
  );
}
