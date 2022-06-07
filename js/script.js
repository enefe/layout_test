// Открытие/Закрытие мобильного меню
$('.header__open-menu').click(function() {
    $('.header__open-menu').click(function() {
        $('.header__menu').slideDown(400);
        $('.header__open-menu').hide();
        $('.header__close-menu').show();
    })
    $('.header__close-menu').click(function() {
        $('.header__menu').slideUp(400);
        $('.header__close-menu').hide();
        $('.header__open-menu').show();
    })
});

// Смена логотипов в зависимости от разрешения экрана пользователя
let logoHeader = document.querySelector('.header__logo');

if (window.innerWidth >= 600) {
    logoHeader.setAttribute('src', 'images/logo-pink-tablet.png');
}

if (window.innerWidth >= 1200) {
    logoHeader.setAttribute('src', 'images/logo-pink-desktop.png');
}

let logoFooter = document.querySelector('.footer__logo');

if (window.innerWidth >= 1200) {
    logoFooter.setAttribute('src', 'images/logotype blue desktop.png');
}

// Слайдер комментариев
const slider = document.querySelector('.comments__container'); // контейнер слайдов
const slides = Array.from(document.querySelectorAll('.comment')); // массив всех слайдов
const navs = Array.from(document.querySelectorAll('.nav'));
const navigation = document.querySelector('.navigation');

let isDragging = false; // нажатие на слайд
let startPos = 0; // начальная позиция перетаскивания
let currentTranslate = 0; // наше будущее значение transform для контейнера
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0; // текущий номер слайда
let currentNav = 0;

slides.forEach((slide, index) => {
    // касания экрана:
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    //касания мыши:
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
})

function touchStart(index) {
    return function(event) {
        currentIndex = index;
        currentNav = index;
        startPos = getPositionX(event);
        isDragging = true;

        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;

        for (let i = 0; i < navs.length; i++) {
            if (currentIndex == i) {
                navs[i].classList.add('nav__active');
                navs[i - 1].classList.remove('nav__active');
            }
        }

    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;

        for (let i = 0; i < navs.length; i++) {
            if (currentIndex == i) {
                navs[i].classList.add('nav__active');
                navs[i + 1].classList.remove('nav__active');
            }
        }
    }

    setPositionByIndex();

    slider.classList.remove('grabbing');
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();

    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}