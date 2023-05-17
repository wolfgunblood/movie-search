import React, { useState } from 'react';
import { Typography, Button, Grid, Box, CircularProgress, ButtonGroup } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();

  const { data, isFetching, error } = useGetActorQuery(id);
  const page = 1;
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  console.log(movies);
  // console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link to="/">Something went wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          className={classes.profile}
          alt={data.name}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h2" align="flex-start" gutterBottom sx={{ marginTop: '50px', fontWeight: '400' }}>
          {data.name}
        </Typography>
        <Typography variant="h5" align="flex-start" gutterBottom>
          Born: {data.birthday}
        </Typography>
        <Typography variant="subtitle3" align="flex-start" gutterBottom>
          {data.biography}
        </Typography>
      </Grid>
      <Grid item container style={{ marginTop: '2rem' }} className={classes.buttonContainer}>
        <Grid item xs={12} sm={6} className={classes.buttonContainer}>
          <ButtonGroup>
            <Button>IMdb</Button>
            <Button>Back</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {movies && movies.results.length > 0
        ? (
          <Box marginTop="5rem" width="100%">
            <Typography variant="h3" gutterBottom align="center">
              You Might also like this.
            </Typography>
            <MovieList movies={movies} />
          </Box>
        )
        : (
          <Box marginTop="5rem" width="100%">
            <Typography variant="h3" gutterBottom align="center">
              Sorry, nothing Like This
            </Typography>
          </Box>
        )}
    </Grid>
  );
};

export default Actors;
