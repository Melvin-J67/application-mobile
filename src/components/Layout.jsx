import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { DRAWER_W } from "../theme";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onMenu={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box component="main"
        sx={{ flex: 1, minWidth: 0, ml: { md: `${DRAWER_W}px` }, pt: 10, px: { xs: 2, md: 4 }, pb: 4, minHeight: "100vh" }}>
        {children}
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 6 }}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Typography>
      </Box>
    </Box>
  );
}
