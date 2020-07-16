export class GetMovies {
  static readonly type = '[Movie API] Get movies'
  constructor(public search: string, public page: string) { }
}

export class GetMovie {
  static readonly type = '[Movie API] Get movie'
  constructor(public id: string) { }
}
