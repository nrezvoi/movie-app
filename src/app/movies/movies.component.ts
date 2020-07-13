import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Movie } from "../models/Movie.model";
import { MovieService } from "../services/movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>
  private searchQuery$ = new Subject<string>()

  constructor(private movieService: MovieService, private router: Router, private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const currentQuery = of(this.currentRoute.snapshot.queryParamMap.get('search'))
    this.movies$ = merge(
      currentQuery,
      this.searchQuery$
    ).pipe(
      distinctUntilChanged(),
      tap((query: string) => {
        this.router.navigate([], {
          queryParams: {
            search: query
          }
        })
      }),
      switchMap((query: string) => this.movieService.findBySearch(query)),
    )
  }

  onSearch(query: string, e: KeyboardEvent): void {
    if (e.code !== 'Enter') {
      return
    }
    this.searchQuery$.next(query)
  }
}
