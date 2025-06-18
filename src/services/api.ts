import axios from 'axios';
import { APIConfig } from '../configs/apiConfig';

export const tmdbApi = axios.create({
  baseURL: APIConfig.TMDB_BASE_URL,
  params: {
    api_key: APIConfig.TMDB_API_KEY,
    language: 'en-US',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
