import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Movie } from '../models/Movie.model';

import { OmdbApiResponse } from '../models/OmdbApiResponse.model'

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

  findBySearch(query: string): Observable<OmdbApiResponse> {
    return this.http.get<OmdbApiResponse>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.defaultParams,
        s: query
      }
    })
  }

  findByimbdID(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(this.omdbApiConfig.url, {
      params: {
        ...this.omdbApiConfig.defaultParams,
        i: imdbId,
        plot: 'full'
      }
    })
  }
}