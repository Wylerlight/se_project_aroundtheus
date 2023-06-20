import Popup from "./Popup.js";

export default class PopupCardDeleteVerify extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._verifyDeleteCardButton = this._popupElement.querySelector(
      "#modal-verify-delete-card-button"
    );
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._verifyDeleteCardButton.addEventListener("click", this._handleSubmit);
  }

  _handleSubmit() {
    this._handleFormSubmit();
  }
}
