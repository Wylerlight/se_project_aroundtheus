export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInformation() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).finally(() => {
      console.log("Done with getting user info");
    });
  }

  updateProfilePicture({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((result) => {
        return result;
      })
      .finally(() => {
        console.log("Done running Avatar change API");
      });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((result) => {
        return result;
      })
      .finally(() => {
        console.log("Done with getting initial cards");
      });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Done adding card from server to page");
      });
  }

  editProfileInformation({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Done sending user info to server");
      });
  }

  deleteCardRequest(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).finally(() => {
      console.log("Done deleting card");
    });
  }

  likesCountAdd(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((result) => {
        return result;
      })
      .finally(() => {
        console.log("Done adding like");
      });
  }

  likesCountRemove(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((result) => {
        return result;
      })
      .finally(() => {
        console.log("Done deleting like");
      });
  }
}

/* -------------------------------------------------------------------------- */
/*                example of what it will look like in index.js               */
/* -------------------------------------------------------------------------- */

////////////////////////////////////////
// loading users
// GET https://around.nomoreparties.co/v1/group-12/users/me
// loading cards
// GET https://around.nomoreparties.co/v1/group-12/cards
// Editing the profile
// PATCH https://around.nomoreparties.co/v1/group-12/users/me
// Adding new card
// POST https://around.nomoreparties.co/v1/group-12/cards
// Delete card request
// DELETE https://around.nomoreparties.co/v1/group-12/cards/cardId
// Request to like cards
// PUT https://around.nomoreparties.co/v1/group-12/cards/likes/cardId
// Remove/delete like
// DELETE https://around.nomoreparties.co/v1/group-12/cards/likes/cardId
// Updating profile picture
// PATCH https://around.nomoreparties.co/v1/group-12/users/me/avatar
