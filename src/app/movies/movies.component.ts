import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pluck, share, switchMap, tap, shareReplay, debounceTime, delay, finalize, defaultIfEmpty, startWith, map } from 'rxjs/operators';
import { Movie } from "../models/Movie.model";
import { MovieService } from "../services/movie.service";

interface InitialParams {
  page: string,
  search: string
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>
  private searchQuery$ = new Subject<string>()
  private currentQuery$: Observable<String>

  @ViewChild('search')
  searchEl: ElementRef

  errorMsg$: Observable<string>
  initialParams$: Observable<InitialParams>

  isLoading: boolean = false
  page: string = '1'

  constructor(private movieService: MovieService, private router: Router, private currentRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.initialParams$ = this.currentRoute.queryParamMap.pipe(
      map(x => {
        return {
          search: x.get('search'),
          page: x.get('page')
        }
      })
    )

    const initialSearch$ = this.initialParams$.pipe(
      pluck('search')
    )

    this.movies$ = merge(
      initialSearch$,
      this.searchQuery$.pipe(
        tap(() => this.page = '1')
      ),
    ).pipe(
      filter((query: string) => query && query.trim() !== ''),
      map((query: string) => query.trim()),
      distinctUntilChanged(),
      tap((query: string) => {
        this.router.navigate([], {
          queryParams: {
            search: query,
            page: this.page,
          }
        })
      }),
      switchMap((query) => this.findMoviesBySearch(query)),
      shareReplay(),
      startWith([])
    )
  }

  findMoviesBySearch(query: string): Observable<Movie[]> {
    this.isLoading = true
    const search$ = this.movieService.findBySearch(query, this.page).pipe(
      finalize(() => {
        this.isLoading = false
      }),
      shareReplay()
    )

    this.errorMsg$ = search$.pipe(
      share(),
      pluck('Error'),
    )

    return search$.pipe(
      pluck('Search'),
    )
  }

  ngAfterViewInit() {
    this.initialParams$.subscribe(({ search }) => {
      this.searchEl.nativeElement.value = search
    })
  }

  onSearch(query: string): void {
    this.searchQuery$.next(query)
  }
}
