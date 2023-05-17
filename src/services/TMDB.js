import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmbdApiKey = process.env.REACT_APP_API_KEY;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({

    //  Get Genre
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmbdApiKey}`,
    }),
    // Get Movies
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmbdApiKey}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmbdApiKey}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmbdApiKey}`;
        }

        return `movie/popular?${page}&api_key=${tmbdApiKey}`;
      },
    }),

    // Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmbdApiKey}`,
    }),

    // Get Recommendations
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `movie/${movieId}/${list}?api_key=${tmbdApiKey}`,
    }),

    // Get Actor
    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmbdApiKey}`,
    }),

    // Get Movies by Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmbdApiKey}`,
    }),

  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
