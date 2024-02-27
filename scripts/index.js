// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content; // Add template
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); // Select cards' container in HTML

// @todo: Функция создания карточки
function createCard(value, delFunction) {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true); // Create card
  const cardTitle = card.querySelector('.card__description .card__title'); // Select card's title
  const cardImage = card.querySelector('.card__image'); // Select card's image

  cardTitle.textContent = value.name; // Set card's title
  cardImage.src = value.link; // Set card's image src

  const delButton = card.querySelector('.card__delete-button');
  delButton.addEventListener('click', delFunction);    

  return card;
}

// @todo: Функция удаления карточки
const delCard = e => e.target.parentElement.remove();     

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const card = createCard(data, delCard);
  cardsContainer.append(card); 
});