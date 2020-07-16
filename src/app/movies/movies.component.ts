import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { GetMovies } from '../actions/movies.actions';
import { Movie } from "../models/Movie.model";
import { IParams } from '../state/movies.state';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {


  @ViewChild('search')
  searchEl: ElementRef

  perPage: number = 10

  movies$: Observable<Movie[]>
  isLoading$: Observable<boolean>
  params$: Observable<IParams>
  totalMovies$: Observable<number>
  error$: Observable<string>

  constructor(private store: Store, private router: Router, private currentRoute: ActivatedRoute) {
    this.movies$ = this.store.select(state => state.movies.data)
    this.isLoading$ = this.store.select(state => state.movies.isLoading)
    this.params$ = this.store.select(state => state.movies.params)
    this.totalMovies$ = this.store.select(state => state.movies.total)
    this.error$ = this.store.select(state => state.movies.error)
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

    this.params$.pipe(
      filter(() => !this.isCached())
    ).subscribe((params: IParams) => {
      this.store.dispatch(new GetMovies(params.search, params.page))
    })
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

  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: {
        search: this.currentRoute.snapshot.queryParamMap.get('search'),
        page
      }
    })
  }

  private isCached() {
    const isMovies = this.store.snapshot().movies.data.length > 0
    const isSearch = this.currentRoute.snapshot.queryParamMap.get('search') === this.store.snapshot().movies.params.search
    const isPage = this.currentRoute.snapshot.queryParamMap.get('page') === this.store.snapshot().movies.params.page

    return isMovies && isSearch && isPage
  }
}
