document.addEventListener('DOMContentLoaded', () => {
    selectCharacteristics();
    switchPhoto();
    addToBag();
});

function selectCharacteristics() {
    var colors = selectorAll('.characteristics_color-item'),
        sizes = selectorAll('.characteristics_size-item');

    chooseChar(colors);
    chooseChar(sizes);

    function chooseChar(char) {
        [].forEach.call(char, (el) => {
            el.on('click', () => {
                [].forEach.call(char, (el) => { el.style.border = '' });
                el.style.border = '1px solid #ccc';
            });
        });
    }
}


function addToBag() {
    var bag = selector('.state__bag > a');
    var addButton = selector('.add-to-bag');
    var amount = 0;
    var cost = 0;
    addButton.on('click', () => {
        var random = Math.round(Math.random() * 150) + 250;
        amount++;
        cost += random;
        bag.innerHTML = `Bag £${cost} (${amount})`;
    });
}

function switchPhoto() {

    var thumbs = selector('.item-details__photos_thumbs');
    var fullImg = selector('.item-details__photos_full > img');
    var wrap = selectorAll('.photos_thumbs_wrap');

    thumbs.on('click', (e) => {
        var src = e.target.firstChild.getAttribute('src');
        fullImg.setAttribute('src', src);

        [].forEach.call(wrap, (wrap) => { wrap.classList.remove('after-wrap') });
        e.target.classList.add('after-wrap');

    });
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