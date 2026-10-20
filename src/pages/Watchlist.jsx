import { Typography } from "@mui/material";
import { useWatchlist } from "../context/WatchlistContext";
import MovieGrid from "../components/MovieGrid";
import { Empty } from "../components/StatusMessages";

export default function Watchlist() {
  const { list } = useWatchlist();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>My Watchlist</Typography>
      {list.length === 0
        ? <Empty>Your watchlist is empty. Tap the bookmark on any poster to save it here.</Empty>
        : <MovieGrid items={list} />}
    </>
  );
}
