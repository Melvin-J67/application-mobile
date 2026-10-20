import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);
export const useWatchlist = () => useContext(WatchlistContext);

const same = (a, b) => a.id === b.id && a.type === b.type; // a movie and a show can share an ID

export function WatchlistProvider({ children }) {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem("watchlist")) || []; } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("watchlist", JSON.stringify(list)); } catch { /* storage unavailable */ }
  }, [list]);

  const has = (item) => list.some((i) => same(i, item));
  const toggle = (item) =>
    setList((l) => (l.some((i) => same(i, item)) ? l.filter((i) => !same(i, item)) : [...l, item]));

  return <WatchlistContext.Provider value={{ list, has, toggle }}>{children}</WatchlistContext.Provider>;
}
