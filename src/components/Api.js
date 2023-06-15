export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getAppInformation() {
    return Promise.all([this.getInitialCards(), this.getUserInformation()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done with getting initial cards");
      });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done adding card from server to page");
      });
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done with getting user info");
      });
  }

  editProfileInformation({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done sending user info to server");
      });
  }

  deleteCardRequest(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done deleting card");
      });
  }

  likesCountAdd(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Done adding like");
      });
  }

  likesCountRemove(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
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
