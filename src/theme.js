import { createTheme } from "@mui/material";

export const DRAWER_W = 220;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f2a93b" },
    background: { default: "#14120f", paper: "#1d1a16" },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: '"Outfit", system-ui, sans-serif', h5: { fontWeight: 700 }, h4: { fontWeight: 700 } },
});
