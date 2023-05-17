import axios from 'axios';

export const moviesApi = axios.create({
  baseURl: 'https://api.themoviedb.org/3',
  params: {
    api_key: ProcessingInstruction.env.REACT_APP_API_KEY,
  },
});
