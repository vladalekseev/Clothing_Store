document.addEventListener('DOMContentLoaded', () => {
    selectCharacteristics();
    switchPhoto();
    addToBag();
});

function selectCharacteristics() {
    const colors = selectorAll('.characteristics_color-item'),
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
    let headerBag = selector('.state__bag'),
          addButton = selector('.add-to-bag');
    let amount = 0,
        cost = 0;
    addButton.on('click', () => {
        const random = Math.round(Math.random() * 150) + 250;
        amount++;
        cost += random;
        headerBag.innerHTML = `Bag £ ${cost} (${amount})`;
    });
}

function switchPhoto() {

    const thumbs = selector('.item-details__photos_thumbs'),
          fullImg = selector('.item-details__photos_full > img'),
          wrap = selectorAll('.photos_thumbs_wrap');

    thumbs.on('click', (e) => {
        const src = e.target.firstChild.getAttribute('src');
        fullImg.setAttribute('src', src);

        [].forEach.call(wrap, (wrap) => { wrap.classList.remove('after-wrap') });
        e.target.classList.add('after-wrap');

    });
}

