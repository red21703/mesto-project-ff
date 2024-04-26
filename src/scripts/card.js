import {deleteMyCard, setLike, deleteLike} from './api.js';
// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content; // Add template

// @todo: Функция создания карточки
export function createCard(value, delItemFunction, likeFunction, showCardImageFunction, myID = 0) {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true); // Create card
  const cardTitle = card.querySelector('.card__description .card__title'); // Select card's title
  const cardImage = card.querySelector('.card__image'); // Select card's image
  const delButton = card.querySelector('.card__delete-button');
  const cardLike = card.querySelector('.card__like-button'); 

  cardTitle.textContent = value.name; // Set card's title
  cardImage.src = value.link; // Set card's image src
  cardImage.alt = value.name; // Set card's image alt
  cardLike.setAttribute( "likes-number", value.likes.length);
  const cardID = value._id; // Set card's ID
  const cardOwnerID = value.owner._id; // Set card's owner ID

  //If card is mine, then add remove button
  if (myID === cardOwnerID || myID === 0){
    delButton.addEventListener('click', () => delItemFunction(card, cardID));
  }
  else {
    delButton.style.display = 'none';
  };
  // Check if card is liked by me, then add like class
  value.likes.forEach((person) => {
    if (person._id === myID){
      cardLike.classList.add('card__like-button_is-active');
    }
  });
 

  cardLike.addEventListener('click', () => likeFunction(card, cardID));
  cardImage.addEventListener('click', () => showCardImageFunction(card));
  return card;
}

export const delItemFunction = (item, cardID) => {
  deleteMyCard(cardID)
  .then (item.remove())
  .catch((err) => {
    console.log(err);
  });
}
export const likeFunction = (card, cardID) =>  {
  const cardLike = card.querySelector('.card__like-button');

  if (!cardLike.classList.contains('card__like-button_is-active')){
    setLike(cardID)
    .then((result) => {
      cardLike.setAttribute( "likes-number", result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
  } 
  else {
    deleteLike(cardID)
    .then((result) => {
      cardLike.setAttribute( "likes-number", result.likes.length);
     })
    .catch((err) => {
      console.log(err);
    });
  };
  cardLike.classList.toggle('card__like-button_is-active');
}