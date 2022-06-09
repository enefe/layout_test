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

if (window.innerWidth >= 660) {
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
let prev = document.querySelector('.nav__prev');
let next = document.querySelector('.nav__next');

let isDragging = false; // нажатие на слайд
let startPos = 0; // начальная позиция перетаскивания
let currentTranslate = 0; // наше будущее значение transform для контейнера
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0; // текущий номер слайда
let idx = 0;

slides.forEach((slide, index) => {
    if (window.innerWidth < 1200) {
        // касания экрана:
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);
        slide.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
        //касания мыши:
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    } else {
        next.addEventListener('click', movePrev);
        prev.addEventListener('click', moveNext);
    }
})



function movePrev() {
    prev.style.display = 'block';
    slides[idx].style.display = 'none'; // Скрываем текущий слайд
    slides[++idx].style.display = 'flex'; // Инкрементируем индекс и показываем следующий слайд
    if (idx === slides.length - 1) { // Убираем "правую" стрелку, если справа слайдов больше нет
        next.style.display = 'none';
    }
}

function moveNext() {
    next.style.display = 'block';
    slides[idx].style.display = 'none';
    slides[--idx].style.display = 'flex';
    if (idx === 0) {
        prev.style.display = 'none';
    }
}

function touchStart(index) {
    return function(event) {
        currentIndex = index;
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
        currentTranslate = prevTranslate + currentPosition - startPos;
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










// Слайдер таблицы

const sliderTable = document.querySelector('.table__container');
const slidesTable = document.querySelectorAll('.table__column');
const navsTable = Array.from(document.querySelectorAll('.table__nav'));

let isDraggingTable = false;
let startPosTable = 0;
let currentTranslateTable = 0;
let prevTranslateTable = 0;
let animationIDTable = 0;
let currentIndexTable = 0;

slidesTable.forEach((slideTable, indexTable) => {
    if (window.innerWidth < 660) {
        // касания экрана:
        slideTable.addEventListener('touchstart', touchTableStart(indexTable));
        slideTable.addEventListener('touchend', touchTableEnd);
        slideTable.addEventListener('touchmove', touchTableMove);
        slideTable.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
        // касания мыши:
        slideTable.addEventListener('mousedown', touchTableStart(indexTable));
        slideTable.addEventListener('mouseup', touchTableEnd);
        slideTable.addEventListener('mouseleave', touchTableEnd);
        slideTable.addEventListener('mousemove', touchTableMove);
    }
})

function touchTableStart(indexTable) {
    return function(event) {
        currentIndexTable = indexTable;
        startPosTable = getTablePositionX(event);
        isDraggingTable = true;

        animationIDTable = requestAnimationFrame(animation);
        sliderTable.classList.add('grabbing');
    }
}

function touchTableEnd() {
    isDraggingTable = false;
    cancelAnimationFrame(animationIDTable);

    const movedBy = currentTranslateTable - prevTranslateTable;
    let sliderLength = slidesTable.length - 1;
    if (movedBy < -100 && currentIndexTable < sliderLength) {
        currentIndexTable += 1;

        for (let i = 0; i < navsTable.length; i++) {
            if (currentIndexTable == i) {
                navsTable[i].classList.add('nav__active');
                navsTable[i - 1].classList.remove('nav__active');
            }
        }

    }

    if (movedBy > 100 && currentIndexTable > 0) {
        currentIndexTable -= 1;

        for (let i = 0; i < navsTable.length; i++) {
            if (currentIndexTable == i) {
                navsTable[i].classList.add('nav__active');
                navsTable[i + 1].classList.remove('nav__active');
            }
        }
    }

    setPositionByIndexTable();

    sliderTable.classList.remove('grabbing');
}

function touchTableMove(event) {
    if (isDraggingTable) {
        const currentPosition = getTablePositionX(event);
        currentTranslateTable = prevTranslateTable + currentPosition - startPosTable;
    }
}

function getTablePositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPositionTable();

    if (isDraggingTable) {
        requestAnimationFrame(animation);
    }
}

function setSliderPositionTable() {
    sliderTable.style.transform = `translateX(${currentTranslateTable}px)`;
}

function setPositionByIndexTable() {
    currentTranslateTable = currentIndexTable * -window.innerWidth;
    prevTranslateTable = currentTranslateTable;
    setSliderPositionTable();
}

if (window.innerWidth >= 660) {
    let tableContainer = document.querySelector('.table__container');
    tableContainer.insertAdjacentHTML('afterbegin', '<div class="table__column"><div class="table__shadow"></div><div class="table__app">Розовый фильтр</div><div class="table__app">Смайлики</div><div class="table__app">Комментарии</div></div>');
}