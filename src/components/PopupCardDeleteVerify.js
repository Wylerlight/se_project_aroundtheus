import Popup from "./Popup.js";

export default class PopupCardDeleteVerify extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    /* this._verifyDeleteCardButton = this._popupElement.querySelector(
      ".card-delete-container"
    ); */
    this._verifyDeleteCardButton = this._popupElement.querySelector(
      "#modal-verify-delete-card-button"
    );
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._verifyDeleteCardButton.addEventListener("click", this._handleSubmit);
  }

  _handleSubmit() {
    this._handleFormSubmit();
  }
}
