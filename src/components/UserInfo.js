export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJobDescription: this._userJobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userJobElement.textContent = userData.about;
    this._userAvatarElement.src = userData.avatar;
    this._userAvatarElement.alt = userData.name;
  }
}
