import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<Movie>

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('id')
    this.movie$ = this.movieService.findByimbdID(imdbId)
  }

}
