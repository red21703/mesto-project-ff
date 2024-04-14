var popupContainer = '';

export function closeModal (element){
  //element.style.display = 'none';
  element.classList.remove('popup_is-opened');
};

export function openModal (element){
  //element.style.display = 'flex';
  element.classList.add('popup_is-opened');
}

export function addEscapeToCloseListener (element){
  popupContainer = element;
  document.addEventListener('keydown', listenkey);
};
export function addClickToCloseListener (element){
  popupContainer = element;
  document.addEventListener('click', listenclick);
};

export function removeEscapeToCloseListener (){
  document.removeEventListener('keydown', listenkey);
};
export function removeClickToCloseListener (){
  document.removeEventListener('click', listenclick);
};



function listenkey (evt) {
  if (evt.key == 'Escape') {
    document.removeEventListener('keydown', listenkey);
    console.log('111');
    removeClickToCloseListener ();
    removeEscapeToCloseListener ();
    closeModal (popupContainer);
  }
};

function listenclick (evt) {
    if (evt.target.className.split(' ').includes('popup')) {
      console.log("success");
      removeClickToCloseListener ();
      removeEscapeToCloseListener ();
      closeModal (popupContainer);
    };
};