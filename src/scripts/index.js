import '../pages/index.css';
import initialCards from './cards.js';
import { openModal, closeModal} from './modal.js';
import { createCard, delItemFunction, likeFunction} from './card.js';

//********* //
// Sprint 5 //
//********* //
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); // Select cards' container in HTML
// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const card = createCard(data, delItemFunction, likeFunction, showCardImageFunction);
  cardsContainer.append(card); 
});

//********* //
// Sprint 6 //
//********* //

//****           Profile editing                      ***** //
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfileContent = document.querySelector('.popup_type_edit');
const popupEditProfileCloseButton = document.forms['edit-profile'].parentElement.querySelector('.popup__close');
const popupEditProfileForm = document.forms['edit-profile'];
const popupEditProfileFormName = document.forms['edit-profile'].elements.name;
const popupEditProfileFormDescriotion = document.forms['edit-profile'].elements.description;

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
  openModal(popupEditProfileContent)
});

// Add listener to close for edit Profile popup
popupEditProfileCloseButton.addEventListener('click', () => closeModal(popupEditProfileContent));

// Add listener to submit for edit Profile popup
popupEditProfileForm.addEventListener('submit', handleEditFormSubmit); 

function handleEditFormSubmit(evt) {
      evt.preventDefault();
      // Выберите элементы, куда должны быть вставлены значения полей
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = popupEditProfileFormName.value;
      profileDescription.textContent = popupEditProfileFormDescriotion.value;
      // close popup
      closeModal(popupEditProfileContent);
}


//****             Add New Card                    ***** //
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardForm = document.forms['new-place'];
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
  const newCard = {
    name: popupAddCardInputPlaceName.value,
    link: popupAddCardInputNameLink.value,
  };
  const card = createCard(newCard, delItemFunction, likeFunction, showCardImageFunction);
  cardsContainer.prepend(card);
  // close popup
  closeModal(popupAddCard);
  popupAddCardForm.reset();
};

//****             Show Card                       ***** //
const popupImageContent = document.querySelector('.popup_type_image');
const popupImageContentCloseButton = popupImageContent.querySelector('.popup__close');
function showCardImageFunction(card){
  const popupImageElement = document.querySelector('.popup__image');
  const popupimageDescription = document.querySelector('.popup__caption');

  const imageSrc = card.querySelector('.card__image').getAttribute('src');
  const imageDescription = card.querySelector('.card__title').textContent;
  
  popupImageElement.src = imageSrc; // Set card's image src
  popupImageElement.alt = popupimageDescription.textContent = imageDescription; // Set card's image alt

  openModal(popupImageContent);
};
// Add listener to close for Add new card popup
popupImageContentCloseButton.addEventListener('click', () => closeModal(popupImageContent));