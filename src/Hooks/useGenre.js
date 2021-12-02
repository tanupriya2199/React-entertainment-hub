const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";
  const selectedIds = selectedGenres.map((genre) => genre.id);
  return selectedIds.join();
};

export default useGenre;
