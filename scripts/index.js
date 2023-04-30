const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

//////// Dom Manipulation ////////

const profilePopup = document.querySelector(".profile-modal");
const profileEditButton = document.querySelector(".profile__button-edit");
const profileModalExitButton = profilePopup.querySelector(".modal__exit");
const profileModalContainer = document.querySelector(".profile-container");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileFormElement =
  profileModalContainer.querySelector(".profile-input");
const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");

const cardListElement = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardPopup = document.querySelector(".card-modal");
const cardAddButton = document.querySelector(".profile__button-add");
const cardModalExitButton = cardPopup.querySelector(".modal__exit");
const cardFormElement = cardPopup.querySelector(".card-input");
const cardTitleInput = cardFormElement.querySelector(
  "#modal-description-title"
);
const cardUrlInput = cardFormElement.querySelector("#modal-description-url");
const imagePopupElement = document.querySelector(".image");
const imagePopupMain = imagePopupElement.querySelector(".image__main");
const imagePopupDescription = imagePopupElement.querySelector(
  ".image__description"
);
const imagePopupExit = imagePopupElement.querySelector(".image__exit");

/////////////////////////

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListElement);
  cardFormElement.reset();
  closeModal(cardPopup);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__button");
  const cardTrashButton = cardElement.querySelector(".card__trash-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-active");
  });

  cardTrashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    imagePopupMain.src = cardData.link;
    imagePopupMain.alt = cardData.name;
    imagePopupDescription.textContent = cardData.name;
    openModal(imagePopupElement);
  });

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profilePopup);
});

profileModalExitButton.addEventListener("click", () =>
  closeModal(profilePopup)
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

cardAddButton.addEventListener("click", () => openModal(cardPopup));

cardModalExitButton.addEventListener("click", () => closeModal(cardPopup));

cardFormElement.addEventListener("submit", handleAddCardFormSubmit);

imagePopupExit.addEventListener("click", () => {
  closeModal(imagePopupElement);
});
