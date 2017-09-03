document.addEventListener('DOMContentLoaded', function() {

    renderCarousel();

    window.on('resize',() => { renderCarousel() });

});

function renderCarousel() {
    const slidesContainer = selector('.carousel-container'),
        pager = selector('.carousel__pager'),
        prevArrow = selector('.slider__arrow_prev'),
        nextArrow = selector('.slider__arrow_next');
    let slideIndex;

    slidesContainer.innerHTML = '';
    pager.innerHTML = '';

    const slides = [Slide('slide1.jpg', 1), Slide('slide2.jpg', 2), Slide('slide3.jpg', 3)];

    slides.forEach((slide, i) => {
        slidesContainer.appendChild(slide);
        const dot = createElement('li', { className : 'pager__item' }, pager);
        dot.on('click',()=>{
            restartInterval();
            showSlide(i+1);
        });
    });

    const dots = selectorAll('.pager__item');

    showSlide(slideIndex = 1);
    let slideInterval = setInterval(() => { showSlide(++slideIndex) }, 10000);

    prevArrow.on('click', changeSlide.bind(null, -1));
    nextArrow.on('click', changeSlide.bind(null, 1));

    slidesContainer.on("touchstart", (e) => {
        const startX = e.changedTouches[0].pageX;
        document.on("touchend", touchEnd);

        function touchEnd(e) {
            document.removeEventListener("touchend", touchEnd);
            const diffX = e.changedTouches[0].pageX - startX;
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
        const device = document.body.clientWidth < 700 ? 'mobile' : document.body.clientWidth < 1024 ? 'tablet' : 'desktop';
        const href = order % 2 === 0 ? 'item-details.html' : 'catalog.html';

        const div = createElement('div', { className : 'carousel__slider'});
        const img = createElement('img', { src : `img/Homepage/${device}/${src}`, alt : alt });
        const a = createElement('a', { href : href }, div, img);
        return div;
    }

}

function createElement(tag, props, parent, ...children) {
    const element = document.createElement(tag);
    Object.keys(props).forEach((key) => {element[key] = props[key]});
    parent && parent.appendChild(element);
    children.forEach((child)=>{
        if (typeof child === 'string') child = document.createTextNode(child);
        element.appendChild(child);
    });
    return element;
}
