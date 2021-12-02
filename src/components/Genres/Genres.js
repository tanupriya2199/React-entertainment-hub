import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  type,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  const handleAddGenre = (genre) => {
    console.log("genre add", genre);
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemoveGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            size="small"
            style={{ margin: 2 }}
            clickable
            color="primary"
            label={genre.name}
            key={genre.name}
            onDelete={() => handleRemoveGenre(genre)}
          ></Chip>
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            size="small"
            style={{ margin: 2 }}
            clickable
            label={genre.name}
            key={genre.name}
            onClick={() => handleAddGenre(genre)}
          ></Chip>
        ))}
    </div>
  );
};

export default Genres;
