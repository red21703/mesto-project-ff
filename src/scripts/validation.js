/*
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
*/
let mainSettingsObject = '';

// show Error
const showInputError = (formElement, inputElement, errorMessage) => {
  console.log(`errorMessage: ${errorMessage}`);
  console.log('formElement');
  console.log(formElement);
  console.log('inputElement');
  console.log(inputElement);
  let formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = errorMessage;
  formError.classList.add(mainSettingsObject.errorClass);
  //inputElement.classList.add(mainSettingsObject.inputErrorClass);
};

//hide Error
const hideInputError = (formElement, inputElement) => {
  let formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove(mainSettingsObject.errorClass);
  formError.textContent = '';
  inputElement.classList.remove(mainSettingsObject.inputErrorClass);
};

// Checks input's validity and displays error or hiddes it
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    inputElement.classList.add(mainSettingsObject.inputErrorClass);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// If one from all input in form is invalid then disables submit button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(mainSettingsObject.inactiveButtonClass);
  } 
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(mainSettingsObject.inactiveButtonClass);
  }
};

// Cheking all input elements for validation. Return true if one from all input elements is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// set inputs listeners for each input in form
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(mainSettingsObject.inputSelector)); // get array of inputs in form
  const buttonElement = formElement.querySelector(mainSettingsObject.submitButtonSelector); // get submit button
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 


// enable all input listeners for all forms
export function enableValidation(settingsObject){
  mainSettingsObject = settingsObject;
  const formList = Array.from(document.querySelectorAll(mainSettingsObject.formSelector)); // get array of forms
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Clear all validatioon errors and disable submit button
export function clearValidation(profileForm, validationConfig){
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector)); // get array of inputs in form
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector); // get submit button
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass)
  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement);
  });
};