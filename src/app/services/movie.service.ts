import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/Movie.model';
import { OmdbApiResponse } from '../models/OmdbApiResponse.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  omdbApiConfig = {
    url: 'http://www.omdbapi.com/',
    defaultParams: {
      apiKey: 'f79aeba3'
    }
  }

  constructor(private http: HttpClient) { }

  findBySearch(query: string, page: string): Observable<OmdbApiResponse> {
    return this.http.get<OmdbApiResponse>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.defaultParams,
        s: query,
        page
      }
    }).pipe(
      catchError(() => {
        return of({
          Response: 'False',
          Error: 'API Error'
        })
      })
    )
  }

  findByimbdID(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.defaultParams,
        i: imdbId,
        plot: 'full'
      }
    }).pipe(
      catchError(() => {
        return of({
          Response: 'False',
          Error: 'API Error'
        })
      })
    )
  }
}
