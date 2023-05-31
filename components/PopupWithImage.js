//This is supposed to open the enlarged image with the close button and description when you click on the card image.

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const imagePopupMain = this._popupElement.querySelector(".image__main");
    const imagePopupDescription = this._popupElement.querySelector(
      ".image__description"
    );
    imagePopupMain.src = data.src;
    imagePopupMain.alt = data.alt;
    imagePopupDescription.textContent = data.alt;

    super.open();
  }
}
