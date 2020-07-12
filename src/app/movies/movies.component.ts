import { Component, OnInit, Input } from '@angular/core';
import { Movie } from "../models/Movie.model";
import { MovieService } from "../services/movie.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[]
  @Input() searchQuery: string

  constructor(private movieService: MovieService, private router: Router, private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.searchQuery = this.currentRoute.snapshot.queryParams.search
    this.movies = this.movieService.findBySearch('')
  }

  onSearch(e: Event) {
    e.preventDefault()

    this.router.navigate([], {
      queryParams: {
        search: this.searchQuery
      }
    })

    // this.movies = this.movieService.findBySearch(query)
  }
}
