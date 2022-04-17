/* eslint-env es6 */
'use strict';

// ////////////////// модальное окно формы
const getScrollWidth = () => {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const onEscKeydownCloseModal = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const body = document.querySelector('.page');
const buttonsOpenModal = document.querySelectorAll('.modal-btn');
const buyModal = document.querySelector('.modal-buy');
const modalForm = document.querySelector('.form-modal');

const inputTelModalForm = modalForm.querySelector('.form-modal__input--tel');
const inputMailFormModal = modalForm.querySelector('.form-modal__input--mail');
const errorInputTel = modalForm.querySelector('.main-input__error--tel');
const errorInputMail = modalForm.querySelector('.main-input__error--mail');

const successModalMessage = document.querySelector('.success-message');
const closeSuccesMesBtn = document.querySelector('.success-message__close');

const inputTelInvalid = () => {
  inputTelModalForm.setCustomValidity('Данные не верны');
  inputTelModalForm.style.border = '1px solid #fe7865';
  errorInputTel.style.opacity = '1';
};

const inputTelvalid = () => {
  inputTelModalForm.style.border = '';
  errorInputTel.style.opacity = '';
  inputTelModalForm.setCustomValidity('');
};

const inputMailInvalid = () => {
  inputMailFormModal.style.border = '1px solid #fe7865';
  errorInputMail.style.opacity = '1';
};

const inputMailValid = () => {
  inputMailFormModal.style.border = '';
  errorInputMail.style.opacity = '';
};

const onInputTel = () => {
  inputTelModalForm.addEventListener('input', () => {
    if (inputTelModalForm.value.length < 10 & inputTelModalForm.value.length !== 0) {
      inputTelInvalid();
    } else {
      inputTelvalid();
    }
  });
};

const onIputMail = () => {
  inputMailFormModal.addEventListener('input', () => {
    if (inputMailFormModal.validity.valid === false) {
      inputMailInvalid();
    } else {
      inputMailValid();
    }
  });
};

const lockBody = (lockPad) => {
  body.classList.add('lock');
  body.style.paddingRight = `${lockPad}` + 'px';
};

const unlockBody = () => {
  body.classList.remove('lock');
  body.style.paddingRight = '';
};

const onClickAwayCloseModal = (evt) => {
  if (!evt.target.closest('.modal-buy__content')) {
    closeModal();
  }
};

const clickAwayCloseSuccessMessage = (evt) => {
  if (!evt.target.closest('.success-message--visible')) {
    hideSuccessModalMessage();
    document.removeEventListener('click', clickAwayCloseSuccessMessage);
    closeSuccesMesBtn.removeEventListener('click', hideSuccessModalMessage);
  }
};

const closeModal = () => {
  buyModal.setAttribute('aria-hidden', 'true');
  unlockBody();
  modalForm.reset();
  document.removeEventListener('keydown', onEscKeydownCloseModal);
  document.removeEventListener('click', onClickAwayCloseModal);
  inputMailValid();
  inputTelvalid();
};

const onBtnCloseModal = (btnClose) => {
  if (modalForm) {
    btnClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
    }, { once: true });
  }
};

const addListenerOnOpenModal = () => {
  setTimeout(() => {
    document.addEventListener('click', onClickAwayCloseModal);
    document.addEventListener('keydown', onEscKeydownCloseModal);
  }, 200);
};

const openModal = () => {
  buyModal.setAttribute('aria-hidden', 'false');
  inputTelModalForm.focus();
  let bodyLockPadding = getScrollWidth();
  lockBody(bodyLockPadding);

  const btnClose = modalForm.querySelector('.modal-buy__close');
  onBtnCloseModal(btnClose);

  addListenerOnOpenModal();
  onInputTel();
  onIputMail();
};

const hideSuccessModalMessage = () => {
  successModalMessage.classList.remove('success-message--visible');
};

const showSuccessPopupMessage = () => {
  successModalMessage.classList.add('success-message--visible');
  closeSuccesMesBtn.addEventListener('click', hideSuccessModalMessage);
  document.addEventListener('click', clickAwayCloseSuccessMessage);
};

const onSuccessSubmit = () => {
  closeModal();
  showSuccessPopupMessage();
};

const onSubmitSendData = () => {
  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    localStorage.setItem('tel', inputTelModalForm.value);
    localStorage.setItem('mail', inputMailFormModal.value);
    onSuccessSubmit();
  });
};

const onBtnShowModal = () => {
  buttonsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
      onSubmitSendData();
    });
  });
};

onBtnShowModal();

// //////////////// конец модальное окно формы

//  ////////////// меню бургер
const headerMenu = document.querySelector('.header-bottom');
const menuButton = document.querySelector('.menu-button');


const showMenu = () => {
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'закрыть меню');
  headerMenu.classList.remove('header-menu--closed');
  headerMenu.classList.add('header-menu--opened');
};

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'открыть меню');
  headerMenu.classList.add('header-menu--closed');
  headerMenu.classList.remove('header-menu--opened');
};

// //////////////// КОНЕЦ меню бургер

document.addEventListener('DOMContentLoaded', () => {

  // headerMenu.classList.remove('header-menu--no-js');
  headerMenu.classList.add('header-bottom--closed');

  menuButton.addEventListener('click', () => {
    if (headerMenu.classList.contains('header-bottom--closed')) {
      showMenu();
    } else {
      closeMenu();
    }
  });
});
