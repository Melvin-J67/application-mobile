import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, IconButton, InputBase, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar({ onMenu }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AppBar position="fixed" color="default" elevation={0}
      sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "background.paper", borderBottom: "1px solid #2e2a24" }}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton edge="start" onClick={onMenu} aria-label="Open menu" sx={{ display: { md: "none" } }}><MenuIcon /></IconButton>
        <Typography component={Link} to="/" variant="h6"
          sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none", letterSpacing: 0.5 }}>
          Reelhouse
        </Typography>
        <Box component="form" onSubmit={submit} role="search"
          sx={{ ml: "auto", display: "flex", alignItems: "center", bgcolor: "#2a2620", borderRadius: 5, px: 1.5, width: { xs: "100%", sm: 320 }, maxWidth: 360 }}>
          <InputBase value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies and TV shows"
            inputProps={{ "aria-label": "Search" }} sx={{ flex: 1, py: 0.5 }} />
          <IconButton type="submit" size="small" aria-label="Search"><SearchIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
