import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  // console.log(movies.results);
  const result = movies.results;

  return (
    <Grid container className={classes.movieContainer}>
      {result.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
