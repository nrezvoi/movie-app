import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { pluck } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  omdbApiConfig = {
    url: 'http://www.omdbapi.com/',
    params: {
      apiKey: 'f79aeba3'
    }
  }

  movie: Movie = {
    "Title": "Funny People",
    "Year": "2009",
    "Runtime": "146 min",
    "Genre": "Comedy, Drama",
    "Plot": "George is a very successful stand up comedian who learns that he has an untreatable blood disorder and is given less than a year to live. Ira is a struggling up-and-coming stand up comedian who works at a deli and has yet to figure out his onstage persona. One night, these two perform at the same club and George takes notice of Ira. George hires Ira to be his semi-personal assistant as well as his friend.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "imdbRating": "6.3",
    "imdbID": "tt1201167",
    "Type": "movie",
  }

  constructor(private http: HttpClient) { }

  findBySearch(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.params,
        s: query
      }
    }).pipe(
      pluck('Search')
    )
  }

  findByimbdID(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.params,
        i: imdbId,
        plot: 'full'
      }
    })
  }
}
