import { useParams } from "react-router-dom";
import { Box, Button, Chip, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import useFetch from "../hooks/useFetch";
import { IMG, normalise } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";
import { ErrorMessage, Loader } from "../components/StatusMessages";

export default function Details() {
  const { type, id } = useParams();
  const { has, toggle } = useWatchlist();
  const valid = type === "movie" || type === "tv";
  const { data: d, loading, error } = useFetch(valid ? `/${type}/${id}` : "/configuration");

  if (!valid) return <ErrorMessage message="Unknown content type." />;
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const item = normalise(d, type);
  const runtime = d.runtime || d.episode_run_time?.[0];
  const backdrop = d.backdrop_path ? IMG + "w1280" + d.backdrop_path : null;
  const saved = has(item);

  return (
    <Box>
      {backdrop && (
        <Box sx={{ height: { xs: 160, md: 280 }, borderRadius: 3, mb: -8,
          backgroundImage: `linear-gradient(to bottom, rgba(20,18,15,.2), #14120f), url(${backdrop})`,
          backgroundSize: "cover", backgroundPosition: "center" }} />
      )}
      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" }, position: "relative", px: { sm: 2 }, pt: backdrop ? 0 : 2 }}>
        <Box sx={{ width: { xs: 160, md: 240 }, flexShrink: 0, alignSelf: { xs: "center", sm: "flex-start" } }}>
          {item.poster
            ? <Box component="img" src={item.poster} alt={item.title} sx={{ width: "100%", borderRadius: 2, boxShadow: 6 }} />
            : <Box sx={{ aspectRatio: "2/3", display: "grid", placeItems: "center", bgcolor: "#2a2620", borderRadius: 2, color: "text.secondary" }}>No poster</Box>}
        </Box>
        <Box sx={{ pt: { sm: 9 } }}>
          <Typography variant="h4">{item.title}</Typography>
          {d.tagline && <Typography color="text.secondary" fontStyle="italic" sx={{ mb: 1 }}>{d.tagline}</Typography>}
          <Typography color="text.secondary" sx={{ mb: 1.5 }}>
            {d.release_date || d.first_air_date || "Release date unknown"}
            {runtime ? ` · ${runtime} min` : ""}
            {type === "tv" && d.number_of_seasons ? ` · ${d.number_of_seasons} season${d.number_of_seasons > 1 ? "s" : ""}` : ""}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <StarIcon color="primary" />
            <Typography>{item.rating ? `${item.rating} / 10 (${d.vote_count} votes)` : "Not rated yet"}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {d.genres?.length
              ? d.genres.map((g) => <Chip key={g.id} label={g.name} size="small" />)
              : <Typography variant="body2" color="text.secondary">Genre not listed</Typography>}
          </Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Overview</Typography>
          <Typography sx={{ maxWidth: 720, mb: 3, lineHeight: 1.7 }}>{d.overview || "No overview is available for this title."}</Typography>
          <Button variant={saved ? "outlined" : "contained"} onClick={() => toggle(item)}
            startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
            {saved ? "Remove from watchlist" : "Add to watchlist"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
