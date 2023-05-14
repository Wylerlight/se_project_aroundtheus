// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (formElement, inputElement, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(option.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(option.errorClass);
};

const hideInputError = (formElement, inputElement, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(option.inputErrorClass);
  errorElement.classList.remove(option.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, option) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, option);
  } else {
    hideInputError(formElement, inputElement, option);
  }
};

const setEventListeners = (formElement, option) => {
  const inputList = Array.from(
    formElement.querySelectorAll(option.inputSelector)
  );
  const buttonElement = formElement.querySelector(option.submitButtonSelector);
  //   toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, option);
      toggleButtonState(inputList, buttonElement, option);
    });
  });
};

const enableValidation = (option) => {
  const formList = Array.from(document.querySelectorAll(option.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, option);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => {
    return !inputList.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, option) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(option.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(option.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const config = {
  formSelector: ".modal__input",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
