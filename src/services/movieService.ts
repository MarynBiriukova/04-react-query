import axios, {type AxiosResponse } from 'axios';
import type{ Movie } from '../types/movie.ts';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      query: query
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`
    }
    };
    
    const response: AxiosResponse<TMDBResponse> = await axios.request<TMDBResponse>(options);
  
  return response.data.results || [];
};

