import { openModal, closeModal, addEscapeToCloseListener, removeEscapeToCloseListener, addClickToCloseListener, removeClickToCloseListener} from './modal.js';
// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content; // Add template

// @todo: Функция создания карточки
export function createCard(value, delItemFunction, likeFunction, showFunction) {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true); // Create card
  const cardTitle = card.querySelector('.card__description .card__title'); // Select card's title
  const cardImage = card.querySelector('.card__image'); // Select card's image
  const delButton = card.querySelector('.card__delete-button');
  const cardLike = card.querySelector('.card__like-button'); 

  cardTitle.textContent = value.name; // Set card's title
  cardImage.src = value.link; // Set card's image src
  cardImage.alt = value.name; // Set card's image alt
  
  delButton.addEventListener('click', () => delItemFunction(card));
  cardLike.addEventListener('click', () => likeFunction(cardLike));
  cardImage.addEventListener('click', () => showFunction(card));

  return card;
}

export const delItemFunction = (item) => item.remove();
export const likeFunction = (cardLike) =>  cardLike.classList.toggle('card__like-button_is-active');
export const showFunction = (card) =>  {

  const popupImageContent = document.querySelector('.popup_type_image');
  const popupImageElement = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__caption');

  const ImageSrc = card.querySelector('.card__image').getAttribute('src');
  const ImageDescription = card.querySelector('.card__title').textContent;
  
  popupImageElement.src = ImageSrc; // Set card's image src
  popupImageElement.alt = popupImageDescription.textContent = ImageDescription; // Set card's image alt

  openModal(popupImageContent);
  showCardImageHandler(popupImageContent);
  
};

function showCardImageHandler (element) { // Only button according to the task
  const closeButton = element.querySelector('.popup__close') 
  addEscapeToCloseListener(element);
  addClickToCloseListener(element);
  closeButton.addEventListener('click', () => {
    closeModal(element);
    removeClickToCloseListener ();
    removeEscapeToCloseListener ();
  });

}

