export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJobDescription: this._userJobElement.textContent,
    };
  }

  setUserInfo({ title, job }) {
    this._userNameElement.textContent = title;
    this._userJobElement.textContent = job;
  }
}
