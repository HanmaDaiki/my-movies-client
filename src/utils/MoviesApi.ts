class MoviesApi {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  _checkResponse(res: Response) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Error ${res.status}`);
	}

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`)
      .then(this._checkResponse)
      .then(data => {
        return data;
      });
  }

}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co');