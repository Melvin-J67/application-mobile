import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { WatchlistProvider } from "./context/WatchlistContext";
import Layout from "./components/Layout";
import { Empty } from "./components/StatusMessages";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import Details from "./pages/Details";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WatchlistProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Browse type="movie" />} />
              <Route path="/tv" element={<Browse type="tv" />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/:type/:id" element={<Details />} />
              <Route path="*" element={<Empty>Page not found.</Empty>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}
