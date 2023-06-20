export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    userId,
    handleCardLike,
    cardTrashButtonVerify,
    handleDeleteCard
  ) {
    this._userId = userId;
    this._cardId = data._id;
    this._currentIdOwner = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardTrashButtonVerify = cardTrashButtonVerify;

    this._handleCardLike = handleCardLike;
    this._cardLikes = data.likes;

    this._cardSelector = cardSelector;

    this.cardIsLiked = this.cardIsLiked.bind(this);

    this._handleDeleteCard = handleDeleteCard;
  }

  handleCardTrashButton() {
    const cardTrashButton = this._element.querySelector(".card__trash-button");

    if (this._currentIdOwner !== this._userId) {
      cardTrashButton.remove();
    }
  }

  updateLike(result) {
    this._cardLikes = result.likes;
    this.showCardLikes();
  }

  showCardLikes() {
    if (this._cardLikes.length > 0) {
      this._element.querySelector(".card__like-counter").textContent =
        this._cardLikes.length;
    } else {
      this._element.querySelector(".card__like-counter").textContent = "";
    }

    if (this.cardIsLiked()) {
      this._element
        .querySelector(".card__button")
        .classList.add("card__like-active");
    } else {
      this._element
        .querySelector(".card__button")
        .classList.remove("card__like-active");
    }
  }

  cardIsLiked() {
    return this._cardLikes.some((likes) => {
      return likes._id === this._userId;
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".card__button");
    const cardTrashButton = this._element.querySelector(".card__trash-button");

    cardTrashButton.addEventListener("click", () => {
      this._cardTrashButtonVerify();
      this._handleDeleteCard(this._cardId, this._element);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleCardClick(this._cardImageElement);
    });

    cardLikeButton.addEventListener("click", () => {
      this._handleCardLike(this);
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
    this.showCardLikes();

    return this._element;
  }
}
