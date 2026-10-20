import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardMedia, IconButton, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieCard({ item, width }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item);
  return (
    <Card sx={{ position: "relative", width, flexShrink: 0, bgcolor: "background.paper",
      transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-4px)", boxShadow: 8 } }}>
      <CardActionArea component={Link} to={`/${item.type}/${item.id}`}>
        {item.poster ? (
          <CardMedia component="img" image={item.poster} alt={item.title} loading="lazy" sx={{ aspectRatio: "2/3", objectFit: "cover" }} />
        ) : (
          <Box sx={{ aspectRatio: "2/3", display: "grid", placeItems: "center", bgcolor: "#2a2620", color: "text.secondary", p: 1, textAlign: "center" }}>
            <Typography variant="body2">No poster available</Typography>
          </Box>
        )}
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" noWrap fontWeight={600}>{item.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {item.year}
            {item.rating && <> &nbsp;<StarIcon sx={{ fontSize: 12, color: "primary.main", verticalAlign: "-2px" }} /> {item.rating}</>}
          </Typography>
        </Box>
      </CardActionArea>
      <IconButton
        size="small"
        aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
        onClick={() => toggle(item)}
        sx={{ position: "absolute", top: 6, right: 6, bgcolor: "rgba(0,0,0,.65)", "&:hover": { bgcolor: "rgba(0,0,0,.85)" } }}
      >
        {saved ? <BookmarkIcon color="primary" fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}
