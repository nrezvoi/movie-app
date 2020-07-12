import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: Movie[] = [
    {
      "Title": "Funny People",
      "Year": "2009",
      "imdbID": "tt1201167",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "The People vs. Larry Flynt",
      "Year": "1996",
      "imdbID": "tt0117318",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTY3NjA3OTY2Nl5BMl5BanBnXkFtZTgwMjAyNjQxMTE@._V1_SX300.jpg"
    },
    {
      "Title": "How to Lose Friends & Alienate People",
      "Year": "2008",
      "imdbID": "tt0455538",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjY0MzFmMDgtY2ZiOC00M2QyLWFmOWMtOTBmZWY4OWE2YTYzXkEyXkFqcGdeQXVyMjA5MTIzMjQ@._V1_SX300.jpg"
    },
    {
      "Title": "Ordinary People",
      "Year": "1980",
      "imdbID": "tt0081283",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNWU3MDFkYWQtMWQ5YS00YTcwLThmNDItODY4OWE2ZTdhZmIwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
    },
    {
      "Title": "People Like Us",
      "Year": "2012",
      "imdbID": "tt1716777",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTM3MzUyNzg3NF5BMl5BanBnXkFtZTcwNjk3NDA4Nw@@._V1_SX300.jpg"
    },
    {
      "Title": "Sleeping with Other People",
      "Year": "2015",
      "imdbID": "tt3165612",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTUyMzQwNjEyNV5BMl5BanBnXkFtZTgwMzYwMzgwNjE@._V1_SX300.jpg"
    },
    {
      "Title": "The Tomorrow People",
      "Year": "2013–2014",
      "imdbID": "tt2660734",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjEyMDA4NjY0Nl5BMl5BanBnXkFtZTgwMDgzNDIxMDE@._V1_SX300.jpg"
    },
    {
      "Title": "24 Hour Party People",
      "Year": "2002",
      "imdbID": "tt0274309",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTcyYzMyZGUtOGExYi00ZTljLWE3NDEtMGQyYTZiNmIzMzRiXkEyXkFqcGdeQXVyNzQ5MzY0NjM@._V1_SX300.jpg"
    },
    {
      "Title": "The People Under the Stairs",
      "Year": "1991",
      "imdbID": "tt0105121",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNGQ4OTI4NmUtZDI1Mi00NTA2LWFlY2YtYWVmNjgzYmFmZjIyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "Ruthless People",
      "Year": "1986",
      "imdbID": "tt0091877",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZjJlYTE3MzYtMGMxMy00OTYyLTg5NzktYmNlOGIzNDEyYjc1XkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
    }
  ]

  movie: Movie = {
    "Title": "Funny People",
    "Year": "2009",
    "Runtime": "146 min",
    "Genre": "Comedy, Drama",
    "Plot": "George is a very successful stand up comedian who learns that he has an untreatable blood disorder and is given less than a year to live. Ira is a struggling up-and-coming stand up comedian who works at a deli and has yet to figure out his onstage persona. One night, these two perform at the same club and George takes notice of Ira. George hires Ira to be his semi-personal assistant as well as his friend.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "imdbRating": "6.3",
    "imdbID": "tt1201167",
    "Type": "movie",
  }

  constructor() { }

  findBySearch(query: string): Movie[] {
    return this.movies
  }

  findByimbdID(imdbId: string): Movie {
    return this.movie
  }
}
