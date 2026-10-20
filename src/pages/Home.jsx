import MovieRow from "../components/MovieRow";

export default function Home() {
  return (
    <>
      <MovieRow title="Trending this week" path="/trending/all/week" />
      <MovieRow title="Popular movies" path="/movie/popular" type="movie" />
      <MovieRow title="Action movies" path="/discover/movie" params={{ with_genres: 28 }} type="movie" />
      <MovieRow title="Popular TV shows" path="/tv/popular" type="tv" />
    </>
  );
}
