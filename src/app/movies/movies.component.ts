import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pluck, share, switchMap, tap, shareReplay, debounceTime, delay, finalize, defaultIfEmpty } from 'rxjs/operators';
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
  private currentQuery$: Observable<String>

  @ViewChild('search')
  searchEl: ElementRef

  errorMsg$: Observable<string>

  isLoading: boolean = false

  constructor(private movieService: MovieService, private router: Router, private currentRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.currentQuery$ = of(this.currentRoute.snapshot.queryParamMap.get('search')).pipe(
      share()
    )
    this.movies$ = merge(
      this.currentQuery$,
      this.searchQuery$
    ).pipe(
      filter((query: String) => query && query.trim() !== ''),
      distinctUntilChanged(),
      tap((query: string) => {
        this.router.navigate([], {
          queryParams: {
            search: query
          }
        })
      }),
      switchMap((query: string) => {
        this.isLoading = true
        const search$ = this.movieService.findBySearch(query).pipe(
          shareReplay(),
          finalize(() => {
            this.isLoading = false
          })
        )

        this.errorMsg$ = search$.pipe(
          filter(res => res.Response !== 'True'),
          share(),
          pluck('Error'),
        )

        return search$.pipe(
          pluck('Search')
        )
      }),
      shareReplay(),
    )
  }

  ngAfterViewInit() {
    this.currentQuery$.subscribe((query) => {
      this.searchEl.nativeElement.value = query
    })
  }

  onSearch(query: string): void {
    this.searchQuery$.next(query)
  }
}
