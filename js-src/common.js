document.addEventListener('DOMContentLoaded', function() {


    loadHeader();
    loadFooter();


    /*==========  Expand search ==========*/

    const magnifier = selector('.main-nav__search');
    document.body.clientWidth < 1024 && magnifier.on('click', expandSearch);


});


function loadHeader() {
    const header = selector('.main-header');

    const xhr = new XMLHttpRequest();
    xhr. open('GET', 'header.html', false);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status != 4) {

            header.outerHTML = xhr.responseText;

            /*==========  Sandwich toggle  ==========*/

            const sandwich = selector('.main-header__sandwich');
            sandwich.on('click', sandwichToggle);


        }
    };
    xhr.send();
}

function loadFooter() {
    const footer = selector('.main-footer');

    const xhr = new XMLHttpRequest();
    xhr. open('GET', 'footer.html');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status != 4) {
            footer.outerHTML = xhr.responseText;
        }
    };
    xhr.send();
}


    /*==========  Sandwich toggle  ==========*/

function sandwichToggle() {

    const sandwichItems = selectorAll('.main-header__sandwich > li');
    selector('.main-nav').classList.toggle('nav-hidden');
    sandwichItems[0].classList.toggle('main-header__sandwic_first-child');
    sandwichItems[1].classList.toggle('hidden');
    sandwichItems[2].classList.toggle('main-header__sandwich_last-child');
}

    /*==========  Expand search ==========*/

function expandSearch() {
    this.classList.add('expand-search');
    document.querySelector('.main-nav__search > input').style.width = '100%';
    document.querySelector('.main-nav').style.paddingRight = '12%';
}


/*==========  Helpers ==========*/
Object.prototype.on = function(event, fn) {
    this.addEventListener(event, fn);
};

function selector(selector) {
    return document.querySelector(selector);
}
function selectorAll(selector) {
    return document.querySelectorAll(selector);
}