import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, share } from 'rxjs/operators';
import { Movie } from '../models/Movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<Movie>
  errorMsg$: Observable<string>

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('id')
    this.movie$ = this.movieService.findByimbdID(imdbId).pipe(
      shareReplay()
    )
    this.errorMsg$ = this.movie$.pipe(
      pluck('Error')
    )
  }

}
