import Popup from "./Popup.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardId = data._id;
    console.log(this._cardId);
    this._currentIdOwner = data.owner._id;
    console.log(this._currentIdOwner);
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  handleCardTrashButton() {
    const cardTrashButton = this._element.querySelector(".card__trash-button");

    if (this._currentIdOwner !== this._cardId) {
      cardTrashButton.remove();
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__button");
    const cardTrashButton = this._element.querySelector(".card__trash-button");
    const verifyDeleteModal = new Popup(".card-delete-verify");

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-active");
    });
    // _toggleLike = () => {
    //   this._likeButton.classList.toggle("card__like-active");
    // };

    cardTrashButton.addEventListener("click", () => {
      // this._element.remove();
      verifyDeleteModal.open();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleCardClick(this._cardImageElement);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    const cardTitleElement = this._element.querySelector(".card__title");
    this._cardImageElement = this._element.querySelector(".card__image");

    cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    this.handleCardTrashButton();

    return this._element;
  }
}
