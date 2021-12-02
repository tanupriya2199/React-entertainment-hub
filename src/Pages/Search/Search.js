import React, { useState, useEffect } from "react";
import { TextField, Button, Tabs, Tab } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPages] = useState(1);
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    primary: {
      main: "#fff",
    },
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, [type, page]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
        <div className="trending">
          {content &&
            content.map((data) => (
              <SingleContent
                key={data.id}
                id={data.id}
                media_type={type ? "tv" : "movie"}
                title={data.title || data.name}
                poster={data.poster_path}
                date={data.release_date || data.first_air_date}
                vote_average={data.vote_average}
              />
            ))}
        </div>
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        {numOfPage > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPage} />
        )}
      </ThemeProvider>
    </div>
  );
};

export default Search;
