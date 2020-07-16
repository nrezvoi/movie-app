import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pluck, share, switchMap, tap, shareReplay, debounceTime, delay, finalize, defaultIfEmpty, startWith, map } from 'rxjs/operators';
import { Movie } from "../models/Movie.model";
import { MovieService } from "../services/movie.service";

interface IParams {
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

  @ViewChild('search')
  searchEl: ElementRef

  errorMsg$: Observable<string>
  params$: Observable<IParams>

  isLoading: boolean = false

  constructor(private movieService: MovieService, private router: Router, private currentRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.params$ = this.currentRoute.queryParamMap.pipe(
      map(x => {
        return {
          search: x.get('search') || '',
          page: x.get('page') || '1'
        }
      }),
      filter((params: IParams) => params.search && params.search.trim() !== ''),
      map((params: IParams) => {
        params.search = params.search.trim()
        return params
      }),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    )

    this.movies$ = this.params$.pipe(
      switchMap((params: IParams) => this.findMoviesBySearch(params.search, params.page)),
      startWith([]),
      shareReplay()
    )
  }

  findMoviesBySearch(query: string, page: string): Observable<Movie[]> {
    this.isLoading = true
    const search$ = this.movieService.findBySearch(query, page).pipe(
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
    this.params$.subscribe((params) => {
      this.searchEl.nativeElement.value = params.search
    })
  }

  onSearch(query: string): void {
    this.router.navigate([], {
      queryParams: {
        search: query,
        page: '1'
      }
    })
  }
}
