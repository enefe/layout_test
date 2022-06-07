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