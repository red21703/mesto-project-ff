let popupContainer = '';

export function closeModal (element){
  element.classList.remove('popup_is-opened');
  removeClickToCloseListener ();
  removeEscapeToCloseListener ();
};

export function openModal (element){
  element.classList.add('popup_is-opened');
  addEscapeToCloseListener();
  addClickToCloseListener();
  popupContainer = element;
  console.log(popupContainer);
}

function addEscapeToCloseListener (){
  document.addEventListener('keydown', listenKey);
};
function addClickToCloseListener (){
  document.addEventListener('click', listenClick);
};

function removeEscapeToCloseListener (){
  document.removeEventListener('keydown', listenKey);
};
function removeClickToCloseListener (){
  document.removeEventListener('click', listenClick);
};

function listenKey (evt) {
  if (evt.key == 'Escape') {
    closeModal (popupContainer);
  }
};

function listenClick (evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal (popupContainer);
    };
};