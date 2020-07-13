import { Movie } from './Movie.model'


export interface OmdbApiResponse {
  Response: Boolean,
  Search: Movie[],
  totalResults: Number
}
