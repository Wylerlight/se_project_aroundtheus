import { openModal } from "../utils/utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._imageModal = document.querySelector(".image");
    const cardLikeButton = this._element.querySelector(".card__button");
    const cardTrashButton = this._element.querySelector(".card__trash-button");
    const cardImagePreviewElement = this._element.querySelector(".card__image");

    const imagePopupMain = this._imageModal.querySelector(".image__main");
    const imagePopupDescription = this._imageModal.querySelector(
      ".image__description"
    );

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-active");
    });

    cardTrashButton.addEventListener("click", () => {
      this._element.remove();
    });

    cardImagePreviewElement.addEventListener("click", () => {
      imagePopupMain.src = this._link;
      imagePopupMain.alt = this._name;
      imagePopupDescription.textContent = this._name;
      openModal(this._imageModal);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    this._cardTitleElement = this._element.querySelector(".card__title");
    this._cardImageElement = this._element.querySelector(".card__image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
