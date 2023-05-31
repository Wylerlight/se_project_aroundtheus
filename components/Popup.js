// This file is a general outline for a popup(modal). It is a generic template for general popup(modal) behavior such as functions for opening and closing the modal, closing the modal with Escape key, and an event listener for closing a modal by clicking the X.

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._modalExitButton = this._popupElement.querySelector(".modal__exit");
  }

  open() {
    //open popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // close popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // Stores logic for closing popup by pressing Esc key
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // add a CLICK event listener to the close icon of popup, image, and description as well as the overlay.
    this._modalExitButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });
  }
}
