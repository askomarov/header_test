import { DynamicAdapt } from '../js/vendors/dynamicAdapt.js';
const da = new DynamicAdapt("min");

//  ////////////// меню бургер
const header = document.querySelector('.header');
const headerMenu = header.querySelector('.header-bottom');
const menuButton = header.querySelector('.menu-button');


const showMenu = () => {
  document.body.classList.add('lock')
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'закрыть меню');
  header.classList.add('header--show-menu');
  headerMenu.classList.remove('header-bottom--closed');
  headerMenu.classList.add('header-bottom--opened');
};

const closeMenu = () => {
  document.body.classList.remove('lock')
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'открыть меню');
  header.classList.remove('header--show-menu');
  headerMenu.classList.add('header-bottom--closed');
  headerMenu.classList.remove('header-bottom--opened');
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello');
  da.init();

  const dropdown = document.querySelectorAll('.t-dropdown');

  dropdown.forEach(customSelect => {
    let btn = customSelect.querySelector('.t-dropdown__trigger');
    btn.addEventListener('click', () => {
      customSelect.classList.toggle('shown')
    })
  });


  // headerMenu.classList.remove('header-menu--no-js');
  headerMenu.classList.add('header-bottom--closed');

  menuButton.addEventListener('click', () => {
    if (headerMenu.classList.contains('header-bottom--closed')) {
      showMenu();
    } else {
      closeMenu();
    }
  });

  if (window.matchMedia("(min-width: 1175px)").matches) {
    headerMenu.classList.remove('header-bottom--opened');
    headerMenu.classList.remove('header-bottom--closed');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock')
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 1175) {
    headerMenu.classList.remove('header-bottom--opened');
    headerMenu.classList.remove('header-bottom--closed');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock')
  }
});


// data-da=".header-bottom, 1175, 0"
