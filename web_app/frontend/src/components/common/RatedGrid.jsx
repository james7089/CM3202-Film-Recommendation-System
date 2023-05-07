import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const RatedGrid = ({ movies }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px" }}>
      {movies.map((movie, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={movie} mediaType={'Movie'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RatedGrid;