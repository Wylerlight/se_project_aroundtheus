export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameSelector.textContent,
      userJobDescription: this._userJobSelector.textContent,
    };
  }

  setUserInfo({ title, job }) {
    this._userNameSelector.textContent = title;
    this._userJobSelector.textContent = job;
  }
}
