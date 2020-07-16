import { Injectable } from '@angular/core'
import { Action, State, StateContext } from '@ngxs/store'
import { skipWhile, tap } from 'rxjs/operators'
import { GetMovies } from '../actions/movies.actions'
import { Movie } from '../models/Movie.model'
import { MovieService } from '../services/movie.service'

export interface IParams {
  page: string,
  search: string
}

export class MovieStateModel {
  data: Movie[]
  params: IParams
  isLoading: boolean
  total: number
  error: string
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    data: [],
    params: {
      search: '',
      page: '1'
    },
    isLoading: false,
    error: '',
    total: 0
  }
})
@Injectable()
export class MovieState {
  constructor(private movieService: MovieService) {

  }

  @Action(GetMovies)
  getMovies({ patchState }: StateContext<MovieStateModel>, { search, page }: GetMovies) {
    patchState({
      isLoading: true
    })
    return this.movieService.findBySearch(search, page).pipe(
      tap((res) => {
        if (res.Error) {
          patchState({
            data: [],
            total: 0,
            error: res.Error,
            isLoading: false
          })
        }
      }),
      skipWhile((res) => !!res.Error),
      tap((res) => {
        patchState({
          error: '',
          data: res.Search,
          isLoading: false,
          total: parseInt(res.totalResults),
          params: {
            search,
            page
          }
        })
      })
    )
  }
}
