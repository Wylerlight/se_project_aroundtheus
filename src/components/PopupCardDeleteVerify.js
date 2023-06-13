import Popup from "./Popup.js";

export default class PopupCardDeleteVerify extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._verifyDeleteCardButton = this._popupElement.querySelector(
      "#modal-verify-delete-card-button"
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
    this._verifyDeleteCardButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit;
    });
  }

  close() {
    super.close();
    this._verifyDeleteCardButton.removeEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit;
    });
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
