document.addEventListener('DOMContentLoaded', function() {


    /*==========  Sandwich toggle  ==========*/

    var sandwich = document.querySelector('.main-header__sandwich');
    sandwich.addEventListener('click', sandwichToggle);


    /*==========  Expand search ==========*/

    var magnifier = document.querySelector('.main-nav__search');
    document.body.clientWidth < 1024 && magnifier.addEventListener('click', expandSearch);

    console.log(document.body.clientWidth);
    console.log(window.innerWidth);

});


    /*==========  Sandwich toggle  ==========*/

function sandwichToggle() {

    var sandwichItems = document.querySelectorAll('.main-header__sandwich > li');
    document.querySelector('.main-nav').classList.toggle('nav-hidden');
    sandwichItems[0].classList.toggle('main-header__sandwic_first-child');
    sandwichItems[1].classList.toggle('hidden');
    sandwichItems[2].classList.toggle('main-header__sandwich_last-child');
}

    /*==========  Expand search ==========*/

function expandSearch() {
    this.classList.add('expand-search');
    document.querySelector('.main-nav__search > input').style.width = '100%';
}