import { Movie } from './Movie.model'


export interface OmdbApiResponse {
  Response: string,
  Search: Movie[],
  totalResults: string
}
