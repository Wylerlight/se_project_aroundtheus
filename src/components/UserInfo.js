export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJobDescription: this._userJobSelector.textContent,
    };
  }

  setUserInfo({ title, job }) {
    this._userNameElement.textContent = title;
    this._userJobSelector.textContent = job;
  }
}
