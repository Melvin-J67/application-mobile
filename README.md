# Reelhouse – Movie Discovery Web Application

A responsive movie and TV discovery app built for the Web and Mobile Application Development practical assignment.

## Features
- Home page with Trending, Popular Movies, Action Movies and Popular TV Shows rows
- Movies and TV Shows pages with genre filtering and pagination
- Search by title (movies and TV), with loading, empty and error states
- Details page: poster, overview, release date, rating, genres, runtime
- My Watchlist saved in `localStorage` (survives refresh)
- Dark theme, responsive layout, mobile drawer navigation

## Technologies
React (Vite, JSX), Material UI, React Router, Fetch API, React Hooks (`useState`, `useEffect`, `useContext`).

## API
[TMDB API](https://www.themoviedb.org/documentation/api).
*This product uses the TMDB API but is not endorsed or certified by TMDB.* Images are provided by TMDB.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and set `VITE_TMDB_TOKEN` to your TMDB API Read Access Token
3. `npm run dev` and open the printed URL

## API key note
Vite bundles `VITE_` variables into the browser build, so the TMDB read token is visible to anyone who inspects the deployed site. It is a low-risk, read-only token and is never committed (`.env` is git-ignored). For stronger protection, route requests through a serverless proxy that keeps the token server-side.

## Deploy
Import the repository into Vercel or Netlify, add `VITE_TMDB_TOKEN` in the project's environment variables, and deploy (`npm run build`, output `dist`). `vercel.json` and `public/_redirects` handle client-side routing.

## Project structure
```
src/
  api/tmdb.js            fetch helper + data normalising
  hooks/useFetch.js      loading / error / data hook
  context/WatchlistContext.jsx   localStorage watchlist
  components/            Navbar, Sidebar, Layout, MovieCard, MovieRow, MovieGrid, StatusMessages
  pages/                 Home, Browse (Movies/TV), SearchResults, Watchlist, Details
  theme.js               MUI dark theme
```

## Screenshots
Add `screenshots/home.png` and `screenshots/details.png` before submitting.
