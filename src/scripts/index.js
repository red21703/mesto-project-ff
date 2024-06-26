import '../pages/index.css';
//import initialCards from './cards.js';
import { openModal, closeModal} from './modal.js';
import { createCard, delItemFunction, likeFunction} from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getMyProfile, updateMyProfileText, createNewCard, updateMyProfileAvatar} from './api.js';

const configObject ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const textForButtonWhileSaving = 'Сохранение...';
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); // Select cards' container in HTML

//****           Profile editing                      ***** //
function profileEdit() {
  const editProfileButton = document.querySelector('.profile__edit-button');
  const popupEditProfileContent = document.querySelector('.popup_type_edit');
  const popupEditProfileCloseButton = document.forms['edit-profile'].parentElement.querySelector('.popup__close');
  const popupEditProfileForm = document.forms['edit-profile'];
  const popupEditProfileFormName = document.forms['edit-profile'].elements.name;
  const popupEditProfileFormDescriotion = document.forms['edit-profile'].elements.description;
  const popupEditProfileSubmitButton = popupEditProfileForm.save;
  // function to fill fields in form from web page
  function setDataFromPageToPopup (){
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;
    const editElements = document.forms['edit-profile'].elements;
    editElements.name.value = profileTitle;
    editElements.description.value = profileDescription;
  }
  // add listener to edit Profile button
  editProfileButton.addEventListener('click', () => {
    setDataFromPageToPopup();
    clearValidation(popupEditProfileForm, configObject);
    openModal(popupEditProfileContent);
  });
  
  // Add listener to close for edit Profile popup
  popupEditProfileCloseButton.addEventListener('click', () => closeModal(popupEditProfileContent));
  
  // Add listener to submit for edit Profile popup
  popupEditProfileForm.addEventListener('submit', handleEditFormSubmit); 
  
  function handleEditFormSubmit(evt) {
        evt.preventDefault();
        // change save button text
        const initialButtonText = popupEditProfileSubmitButton.textContent;
        popupEditProfileSubmitButton.textContent = textForButtonWhileSaving;
        // Выберите элементы, куда должны быть вставлены значения полей
        let profileData = {
          name: popupEditProfileFormName.value,
          about: popupEditProfileFormDescriotion.value
        }
        updateMyProfileText(profileData)
          .then((result) => {
          setMyProfileFromServer(result);
          // close popup
          closeModal(popupEditProfileContent);
          })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupEditProfileSubmitButton.textContent = initialButtonText);
  }
}
profileEdit();

//****             Add New Card                    ***** //
function addNewCard(){
  const addButton = document.querySelector('.profile__add-button');
  const popupAddCard = document.querySelector('.popup_type_new-card');
  const popupAddCardForm = document.forms['new-place'];
  const popupAddCardSubmitButton = document.forms['new-place'].save;
  const popupAddCardCloseButton = document.forms['new-place'].parentElement.querySelector('.popup__close');
  const popupAddCardInputPlaceName = document.forms['new-place'].elements['place-name'];
  const popupAddCardInputNameLink = document.forms['new-place'].elements.link;
  // add listener to Add new card button
  addButton.addEventListener('click', () => openModal(popupAddCard));
  
  // Add listener to close for Add new card popup
  popupAddCardCloseButton.addEventListener('click', () => closeModal(popupAddCard));
  
  // Add listener to submit for Add new card popup
  popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);
  
  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    // textForButtonWhileSaving
    const initialButtonText = popupAddCardSubmitButton.textContent;
    popupAddCardSubmitButton.textContent = textForButtonWhileSaving;
    const newCard = {
      name: popupAddCardInputPlaceName.value,
      link: popupAddCardInputNameLink.value,
    };
    createNewCard(newCard)
    .then((result) => {
      const card = createCard(result, delItemFunction, likeFunction, showCardImageFunction, result.owner._id);
      cardsContainer.prepend(card);
      // close popup
      closeModal(popupAddCard);
      popupAddCardForm.reset();
      clearValidation(popupAddCardForm, configObject);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddCardSubmitButton.textContent = initialButtonText);
  };

}
addNewCard();

//****             Show Card                       ***** //
const popupImageContent = document.querySelector('.popup_type_image');
const popupImageContentCloseButton = popupImageContent.querySelector('.popup__close');
function showCardImageFunction(card){
  const popupImageElement = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__caption');

  const imageSrc = card.querySelector('.card__image').getAttribute('src');
  const imageDescription = card.querySelector('.card__title').textContent;
  
  popupImageElement.src = imageSrc; // Set card's image src
  popupImageElement.alt = popupImageDescription.textContent = imageDescription; // Set card's image alt

  openModal(popupImageContent);
};
// Add listener to close for Add new card popup
popupImageContentCloseButton.addEventListener('click', () => closeModal(popupImageContent));

//********************** //
// Change Profile avatar //
//********************** //
function initEditAvatae(){
  const editProfileAvatarButton = document.querySelector('.profile__image');
  const popupEditAvatar = document.querySelector('.popup_type_change-avatar');
  const popupEditAvatarCloseButton = document.forms['new-avatar'].parentElement.querySelector('.popup__close');
  const popupEditAvatarForm = document.forms['new-avatar'];
  const popupEditAvatarLink = popupEditAvatarForm.elements.avatar;
  const popupEditAvatarSubmitButton = popupEditAvatarForm.save;
  //add listener to edit profile avatar button
  editProfileAvatarButton.addEventListener('click', () => openModal(popupEditAvatar));
  // Add listener to close edit avatar popup
  popupEditAvatarCloseButton.addEventListener('click', () => closeModal(popupEditAvatar));
  // Add listener to submit for popupEditAvatar
   popupEditAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);
  // Function resolving submit
  function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();
    const initialButtonText = popupEditAvatarSubmitButton.textContent;
    popupEditAvatarSubmitButton.textContent = textForButtonWhileSaving;
    const newAvatar = popupEditAvatarLink.value
    updateMyProfileAvatar(newAvatar)
    .then((result) => {
      editProfileAvatarButton.style.backgroundImage = `url('${result.avatar}')`;
      // close popup
      closeModal(popupEditAvatar);
      popupEditAvatarForm.reset();
      clearValidation(popupEditAvatarForm, configObject);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEditAvatarSubmitButton.textContent = initialButtonText);
  };
  
}
initEditAvatae();

//*********** //
// Validation //
//*********** //
enableValidation(configObject);

//********************************** //
// Load Card and profile drom server //
//********************************** //
showProfileFromServer();
function showProfileFromServer() {
  getMyProfile()
  .then((result) => {
    setMyProfileFromServer(result)
  })
  .catch((err) => {
    console.log(err);
  });
}
function setMyProfileFromServer(profile){
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url('${profile.avatar}')`;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;

}
function setCards(cardsArray, myId){
  cardsArray.forEach((data) => {
    const card = createCard(data, delItemFunction, likeFunction, showCardImageFunction, myId);
    cardsContainer.append(card);
  });
};
const loadUserAndCards = [getInitialCards(), getMyProfile()];
Promise.all(loadUserAndCards)
  .then(([cardsArray, myProfile]) => {
    const myId = myProfile._id;
    setCards(cardsArray, myId);
  })
  .catch((err) => {
    console.log(err);
  });