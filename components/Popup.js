// This file is a general outline for a popup(modal). It is a generic template for general popup(modal) behavior such as functions for opening and closing the modal, closing the modal with Escape key, and an event listener for closing a modal by clicking the X.

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open(modal) {
    //open popup
    console.log(modal);
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(modal) {
    // close popup
    console.log(modal);
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // Stores logic for closing popup by pressing Esc key
    if (evt.key === "Escape") {
      console.log("escape button pressed");
      const openedModal = document.querySelector(".modal_opened");
      console.log(openedModal);
      this.close(openedModal);
    }
  }

  setEventListeners() {
    // add a CLICK event listener to the close icon of popup, image, and description.
    this._popupElement.addEventListener("click", () => this.close());
  }
}
