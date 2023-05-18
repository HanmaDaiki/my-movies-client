import { TMovie } from "../types/TMovie";

class MainApi {
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

	signIn(email: string, password: string) {
		return fetch(`${this._url}/signin`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify({
				email,
				password
			}),
		})
		.then(this._checkResponse);
	}

	signUp(name: string, email: string, password: string) {
		return fetch(`${this._url}/signup`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify({
				email,
				password,
				name
			}),
		})
		.then(this._checkResponse);
	}

	getUser(jwt: string) {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
			credentials: "include",
		})
		.then(this._checkResponse);
	}

	identificationUser(jwt: string) {
    return fetch(`${this._url}/users/me/`, {
			method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
			credentials: "include",
    })
		.then(this._checkResponse);
  }

	updateUser(email: string, name: string, jwt: string){
		return fetch(`${this._url}/users/me/`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
			},
			credentials: "include",
			body: JSON.stringify({
				email,
				name,
			}),
		})
		.then(this._checkResponse);
	}

	getSavedMovies(jwt: string) {
		return fetch(`${this._url}/movies`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
			},
			credentials: "include",
		})
		.then(this._checkResponse);
	}
	
	postSavedMovies(movie: TMovie, jwt: string) {
		return fetch(`${this._url}/movies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
			},
			credentials: "include",
			body: JSON.stringify(movie)
		})
		.then(this._checkResponse);
	}

	deleteSavedMovie(id: string, jwt: string) {
		return fetch(`${this._url}/movies/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
			},
			credentials: "include",
		})
	}
}

export const mainApi = new MainApi('https://my-movies-api.vercel.app/api');