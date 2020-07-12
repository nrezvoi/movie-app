import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movie = this.movieService.findByimbdID('')
  }

}
