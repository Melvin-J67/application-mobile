import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({ items }) {
  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))" }}>
      {items.map((it) => <MovieCard key={`${it.type}-${it.id}`} item={it} width="100%" />)}
    </Box>
  );
}
