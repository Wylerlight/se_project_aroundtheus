import Popup from "./Popup.js";

export default class PopupCardDeleteVerify extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupVerifyDelete = this._popupElement.querySelector(
      "#modal-verify-delete-card-button"
    );
  }

  setEventListeners() {
    this._popupVerifyDelete.addEventListener("click", (evt) => {
      evt.preventDefault();
    });
    super.setEventListeners();
  }
}
