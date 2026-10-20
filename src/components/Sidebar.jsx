import { NavLink } from "react-router-dom";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { DRAWER_W, theme } from "../theme";

const NAV = [
  { label: "Home", to: "/", icon: <HomeIcon /> },
  { label: "Movies", to: "/movies", icon: <MovieIcon /> },
  { label: "TV Shows", to: "/tv", icon: <TvIcon /> },
  { label: "My Watchlist", to: "/watchlist", icon: <BookmarkIcon /> },
];

export default function Sidebar({ open, onClose }) {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const content = (
    <Box sx={{ width: DRAWER_W, pt: isDesktop ? 9 : 2 }} onClick={!isDesktop ? onClose : undefined}>
      <List>
        {NAV.map((n) => (
          <ListItemButton key={n.to} component={NavLink} to={n.to} end={n.to === "/"}
            sx={{ mx: 1, borderRadius: 2, "&.active": { bgcolor: "rgba(242,169,59,.16)", color: "primary.main", "& .MuiListItemIcon-root": { color: "primary.main" } } }}>
            <ListItemIcon sx={{ minWidth: 40 }}>{n.icon}</ListItemIcon>
            <ListItemText primary={n.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return isDesktop ? (
    <Drawer variant="permanent"
      sx={{ width: DRAWER_W, "& .MuiDrawer-paper": { width: DRAWER_W, bgcolor: "background.default", borderRight: "1px solid #2e2a24" } }}>
      {content}
    </Drawer>
  ) : (
    <Drawer variant="temporary" open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>{content}</Drawer>
  );
}
