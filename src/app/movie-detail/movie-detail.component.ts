import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetMovie } from '../actions/movies.actions';
import { Movie } from '../models/Movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<Movie>
  isLoading$: Observable<boolean>
  error$: Observable<string>

  constructor(private store: Store, private route: ActivatedRoute) {
    this.movie$ = this.store.select(state => state.movies.selected)
    this.isLoading$ = this.store.select(state => state.movies.isLoading)
    this.error$ = this.store.select(state => state.movies.error)
  }

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('id')
    if (imdbId === this.store.snapshot().movies.selected?.imdbID) {
      return
    }
    this.store.dispatch(new GetMovie(imdbId))
  }

}
