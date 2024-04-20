import { showCardImageFunction } from './index.js';
// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content; // Add template

// @todo: Функция создания карточки
export function createCard(value, delItemFunction, likeFunction) {
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
  cardImage.addEventListener('click', () => showCardImageFunction(card));

  return card;
}

export const delItemFunction = (item) => item.remove();
export const likeFunction = (cardLike) =>  cardLike.classList.toggle('card__like-button_is-active');
