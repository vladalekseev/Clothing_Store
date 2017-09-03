'use strict';

document.addEventListener('DOMContentLoaded', function () {

    renderCarousel();

    window.on('resize', function () {
        renderCarousel();
    });
});

function renderCarousel() {
    var slidesContainer = selector('.carousel-container'),
        pager = selector('.carousel__pager'),
        prevArrow = selector('.slider__arrow_prev'),
        nextArrow = selector('.slider__arrow_next');
    var slideIndex = void 0;

    slidesContainer.innerHTML = '';
    pager.innerHTML = '';

    var slides = [Slide('slide1.jpg', 1), Slide('slide2.jpg', 2), Slide('slide3.jpg', 3)];

    slides.forEach(function (slide, i) {
        slidesContainer.appendChild(slide);
        var dot = createElement('li', { className: 'pager__item' }, pager);
        dot.on('click', function () {
            restartInterval();
            showSlide(i + 1);
        });
    });

    var dots = selectorAll('.pager__item');

    showSlide(slideIndex = 1);
    var slideInterval = setInterval(function () {
        showSlide(++slideIndex);
    }, 10000);

    prevArrow.on('click', changeSlide.bind(null, -1));
    nextArrow.on('click', changeSlide.bind(null, 1));

    slidesContainer.on("touchstart", function (e) {
        var startX = e.changedTouches[0].pageX;
        document.on("touchend", touchEnd);

        function touchEnd(e) {
            document.removeEventListener("touchend", touchEnd);
            var diffX = e.changedTouches[0].pageX - startX;
            diffX > 0 ? changeSlide(-1) : changeSlide(1);
        }
    });

    function changeSlide(n) {
        restartInterval();
        showSlide(slideIndex += n);
    }

    function showSlide(index) {

        slides.forEach(function (slide, i) {
            slide.style.display = 'none';
            dots[i].classList.remove('pager__item-active');
        });

        slideIndex = index > slides.length ? 1 : index < 1 ? slides.length : index;
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('pager__item-active');
    }

    function restartInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(function () {
            showSlide(++slideIndex);
        }, 10000);
    }

    function Slide(src, order) {
        var alt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'slide';

        var device = document.body.clientWidth < 700 ? 'mobile' : document.body.clientWidth < 1024 ? 'tablet' : 'desktop';
        var href = order % 2 === 0 ? 'item-details.html' : 'catalog.html';

        var div = createElement('div', { className: 'carousel__slider' });
        var img = createElement('img', { src: 'img/Homepage/' + device + '/' + src, alt: alt });
        var a = createElement('a', { href: href }, div, img);
        return div;
    }
}

function createElement(tag, props, parent) {
    var element = document.createElement(tag);
    Object.keys(props).forEach(function (key) {
        element[key] = props[key];
    });
    parent && parent.appendChild(element);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
    }

    children.forEach(function (child) {
        if (typeof child === 'string') child = document.createTextNode(child);
        element.appendChild(child);
    });
    return element;
}