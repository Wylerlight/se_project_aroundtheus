// This fle is for adding function to the newly created card such as: function to the trash icon, interactive like button, cloning the template of the structure of the card

import { openModal } from "../utils/utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".card__button");
    const cardTrashButton = this._element.querySelector(".card__trash-button");

    const imageModal = document.querySelector(".card__image");

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-active");
    });

    cardTrashButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleCardClick(this._cardImageElement);
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
