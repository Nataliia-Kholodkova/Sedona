let navigation = document.querySelector('.navigation');
let navigation_btn_open = document.querySelector('.btn-menu__open');
let navigation_btn_close = document.querySelector('.btn-menu__close');

navigation.classList.remove('navigation__js');
navigation.classList.add('navigation__closed');

navigation_btn_open.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.classList.add('navigation__opened');
    navigation.classList.remove('navigation__closed');
});

navigation_btn_close.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.classList.remove('navigation__opened');
    navigation.classList.add('navigation__closed');
});


function openSearchForm() {
    event.preventDefault();
    let form = document.querySelector('.search-form__modal');
    let overlay = document.querySelector('.overlay');
    overlay.classList.remove('overlay__hidden');
    overlay.classList.add('overlay__display');
    form.classList.remove('modal__hidden');
    form.classList.add('modal__display');
}

function  closeSearchForm() {
    event.preventDefault();
    let form = document.querySelector('.search-form__modal');
    let overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay__hidden');
    overlay.classList.remove('overlay__display');
    form.classList.add('modal__hidden');
    form.classList.remove('modal__display');
}

function decreaseNumber(type) {
    event.preventDefault();
    let class_name = '.input-number__' + type;
    let input = document.querySelector(class_name);
    let value = +input.value - 1;
    if (value >= +input.min) {
        input.value = value
    }
}

function increaseNumber(type) {
    event.preventDefault();
    let class_name = '.input-number__' + type;
    let input = document.querySelector(class_name);
    let value = +input.value + 1;
    if (value <= +input.max) {
        input.value = value;
    }
}
