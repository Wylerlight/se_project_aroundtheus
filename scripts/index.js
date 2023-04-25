const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//////// Dom Manipulation ////////

/* Elements */
const profilePopup = document.querySelector(".profile-modal");
const profileEditButton = document.querySelector(".profile__button-edit");
const modalExitButton = document.querySelector(".modal__exit");

const modalContainer = document.querySelector(".modal__container");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileFormElement = modalContainer.querySelector(".modal__input");
const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");

const cardListElement = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/////////////////////////

/* Functions */
const openModal = function () {
  titleInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  profilePopup.classList.add("modal_opened");
};

const closeModal = function () {
  profilePopup.classList.remove("modal_opened");
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  return cardElement;
}

/* Event Listeners */

profileEditButton.addEventListener("click", openModal);

modalExitButton.addEventListener("click", closeModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  // return the ready HTML element with the filled-in data
  cardListElement.append(cardElement);
});
