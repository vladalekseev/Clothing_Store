document.addEventListener('DOMContentLoaded', function() {

    renderCarousel();

    window.on('resize',() => { renderCarousel() });

});

function renderCarousel() {
    var slidesContainer = selector('.carousel-container'),
        pager = selector('.carousel__pager'),
        prevArrow = selector('.slider__arrow_prev'),
        nextArrow = selector('.slider__arrow_next'),
        slideIndex;

    slidesContainer.innerHTML = '';
    pager.innerHTML = '';

    var slides = [Slide('slide1.jpg', 1), Slide('slide2.jpg', 2), Slide('slide3.jpg', 3)];

    slides.forEach((slide, i) => {
        slidesContainer.appendChild(slide);
        var dot = createElement('li', { className : 'pager__item' }, pager);
        dot.on('click',()=>{
            restartInterval();
            showSlide(i+1);
        });
    });

    var dots = selectorAll('.pager__item');

    showSlide(slideIndex = 1);
    var slideInterval = setInterval(() => { showSlide(++slideIndex) }, 10000);

    prevArrow.on('click', changeSlide.bind(null, -1));
    nextArrow.on('click', changeSlide.bind(null, 1));

    slidesContainer.on("touchstart", (e) => {
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

        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            dots[i].classList.remove('pager__item-active');
        });

        slideIndex = index > slides.length ? 1 : index < 1 ? slides.length : index;
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('pager__item-active');
    }

    function restartInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => { showSlide(++slideIndex) }, 10000);
    }

    function Slide(src, order , alt='slide') {
        var device = document.body.clientWidth < 700 ? 'mobile' : document.body.clientWidth < 1024 ? 'tablet' : 'desktop';
        var href = order % 2 === 0 ? 'item-details.html' : 'catalog.html';

        var div = createElement('div', { className : 'carousel__slider'});
        var img = createElement('img', { src : `img/Homepage/${device}/${src}`, alt : alt });
        var a = createElement('a', { href : href }, div, img);
        return div;
    }

}

function createElement(tag, props, parent, ...children) {
    var element = document.createElement(tag);
    Object.keys(props).forEach((key) => {element[key] = props[key]});
    parent && parent.appendChild(element);
    children.forEach((child)=>{
        if (typeof child === 'string') child = document.createTextNode(child);
        element.appendChild(child);
    });
    return element;
}

function selector(selector) {
    return document.querySelector(selector);
}
function selectorAll(selector) {
    return document.querySelectorAll(selector);
}
Object.prototype.on = function(event, fn) {
    this.addEventListener(event, fn);
};
