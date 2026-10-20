import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { keepPlayable, normalise } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import { Empty, ErrorMessage, Loader } from "../components/StatusMessages";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const { data, loading, error } = useFetch("/search/multi", { query: q });
  const items = data ? data.results.filter(keepPlayable).map((r) => normalise(r)) : [];

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Results for “{q}”</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && <Empty>No matches for “{q}”. Check the spelling or try a different title.</Empty>}
      {!loading && !error && <MovieGrid items={items} />}
    </>
  );
}
