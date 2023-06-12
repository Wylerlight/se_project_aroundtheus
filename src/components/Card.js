import Popup from "./Popup.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleDeleteCard) {
    this._userId = userId;
    this._cardId = data._id;
    this._currentIdOwner = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;

    this._cardSelector = cardSelector;
  }

  handleCardTrashButton() {
    const cardTrashButton = this._element.querySelector(".card__trash-button");

    if (this._currentIdOwner !== this._userId) {
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
    const verifyDeleteButton = document.querySelector(
      "#modal-verify-delete-card-button"
    );

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-active");
    });
    // _toggleLike = () => {
    //   this._likeButton.classList.toggle("card__like-active");
    // };

    cardTrashButton.addEventListener("click", () => {
      verifyDeleteModal.open();
      verifyDeleteModal.setEventListeners();

      verifyDeleteButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log(this._cardId);
        this._handleDeleteCard(this._cardId, this._element.remove());
      });
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
