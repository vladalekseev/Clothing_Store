'use strict';

document.addEventListener('DOMContentLoaded', function () {
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
        [].forEach.call(char, function (el) {
            el.on('click', function () {
                [].forEach.call(char, function (el) {
                    el.style.border = '';
                });
                el.style.border = '1px solid #ccc';
            });
        });
    }
}

function addToBag() {
    var headerBag = selector('.state__bag'),
        addButton = selector('.add-to-bag');
    var amount = 0,
        cost = 0;
    addButton.on('click', function () {
        var random = Math.round(Math.random() * 150) + 250;
        amount++;
        cost += random;
        headerBag.innerHTML = 'Bag \xA3 ' + cost + ' (' + amount + ')';
    });
}

function switchPhoto() {

    var thumbs = selector('.item-details__photos_thumbs'),
        fullImg = selector('.item-details__photos_full > img'),
        wrap = selectorAll('.photos_thumbs_wrap');

    thumbs.on('click', function (e) {
        var src = e.target.firstChild.getAttribute('src');
        fullImg.setAttribute('src', src);

        [].forEach.call(wrap, function (wrap) {
            wrap.classList.remove('after-wrap');
        });
        e.target.classList.add('after-wrap');
    });
}