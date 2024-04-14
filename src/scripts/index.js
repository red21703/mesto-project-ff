import '../pages/index.css';
import initialCards from './cards.js';
import { openModal, closeModal, addEscapeToCloseListener, removeEscapeToCloseListener, addClickToCloseListener, removeClickToCloseListener} from './modal.js';
import { createCard, delItemFunction, likeFunction, showFunction} from './card.js';

//********* //
// Sprint 5 //
//********* //
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); // Select cards' container in HTML
// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const card = createCard(data, delItemFunction, likeFunction, showFunction);
  cardsContainer.append(card); 
});

//********* //
// Sprint 6 //
//********* //

//****           Profile editing                      ***** //
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditContent = document.querySelector('.popup_type_edit');
// function to handel closing the popup
function EditProfileHandler (element) {
  const popupcloseButton = element.querySelector('.popup__close');

  addEscapeToCloseListener(element);
  addClickToCloseListener(element);
  popupcloseButton.addEventListener('click', () => {
    closeModal(element);
    removeClickToCloseListener ();
    removeEscapeToCloseListener ();
    setProfilePopup();
  });

  // Submit form Edit profile for API, useing template from practicum
  // Находим форму в DOM
  const formElement = element.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
  // Находим поля формы в DOM
  const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
  const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function handleFormSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                  // Так мы можем определить свою логику отправки.
                                                  // О том, как это делать, расскажем позже.

      // Получите значение полей jobInput и nameInput из свойства value
      const nameInputValue = nameInput.value;
      const jobInputValue = jobInput.value;
      // Выберите элементы, куда должны быть вставлены значения полей
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameInputValue;
      profileDescription.textContent = jobInputValue;
      // close popup
      closeModal(element);
      document.removeEventListener('keydown', listenkey);
  }
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleFormSubmit);  
};
// function to fill fielsd in form from web page
function setProfilePopup (){
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;
  const editElements = document.forms['edit-profile'].elements;
  editElements.name.value = profileTitle;
  editElements.description.value = profileDescription;
}
// add listener to Profile buttons
editProfileButton.addEventListener('click', () => {
  openModal(popupEditContent);
  EditProfileHandler(popupEditContent);
});
// Set popup default fields in form
setProfilePopup();




//****             Add Card                       ***** //
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
//closing add card 
function AddCardHandler(element) { //
  const popupcloseButton = element.querySelector('.popup__close');
  addEscapeToCloseListener(element);
  addClickToCloseListener(element);
  popupcloseButton.addEventListener('click', () => {
    closeModal(element);
    removeClickToCloseListener ();
    removeEscapeToCloseListener ();
  });


  // Находим форму в DOM
  const formElement = element.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
  // Находим поля формы в DOM
  const CardNameInput = formElement.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
  const URLInput = formElement.querySelector('.popup__input_type_url');// Воспользуйтесь инструментом .querySelector()
  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function handleFormCardSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                  // Так мы можем определить свою логику отправки.
                                                  // О том, как это делать, расскажем позже.
      const NewCard = {
          name: CardNameInput.value,
          link: URLInput.value,
        };
      const card = createCard(NewCard, delItemFunction, likeFunction);
      const theFirstChild = cardsContainer.firstChild;
      cardsContainer.insertBefore(card, theFirstChild);
      // close popup
      CardNameInput.value = '';
      URLInput.value = '';
      closeModal(element);
      formElement.removeEventListener('submit', handleFormCardSubmit);
  }
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleFormCardSubmit);  
};
// add listener to Add new card button
addButton.addEventListener('click', () => {
  openModal(popupAddCard);
  AddCardHandler(popupAddCard);
});