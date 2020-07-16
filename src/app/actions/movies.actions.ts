export class GetMovies {
  static readonly type = '[Movie API] Get movies'
  constructor(public search: string, public page: string) { }
}
