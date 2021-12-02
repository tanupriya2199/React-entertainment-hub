import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handleClick = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          color={"primary"}
          count={numOfPages}
          hideNextButton
          hidePrevButton
          onChange={(_, page) => handleClick(page)}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
