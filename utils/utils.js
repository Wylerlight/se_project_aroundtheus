function closePopupWithEscapeKeydown(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export const openModal = function (modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupWithEscapeKeydown);
};

export const closeModal = function (modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupWithEscapeKeydown);
};
