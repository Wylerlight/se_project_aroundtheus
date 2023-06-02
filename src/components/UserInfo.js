export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
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
