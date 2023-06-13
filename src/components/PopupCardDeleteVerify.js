import Popup from "./Popup.js";

export default class PopupCardDeleteVerify extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._verifyDeleteCardButton = this._popupElement.querySelector(
      ".card-delete-container"
    );
    this._something = this._popupElement.querySelector(
      "#modal-verify-delete-card-button"
    );
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  _handleSubmitFunction(evt) {
    evt.preventDefault();
    this._handleFormSubmit();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  close() {
    super.close();
    this._verifyDeleteCardButton.removeEventListener(
      "submit",
      this._handleSubmitFunction
    );
  }

  setEventListeners() {
    this._verifyDeleteCardButton.addEventListener(
      "submit",
      this._handleSubmitFunction
    );
    super.setEventListeners();
  }
}
