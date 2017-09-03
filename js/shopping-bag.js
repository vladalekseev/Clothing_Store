'use strict';

document.addEventListener('DOMContentLoaded', function () {
    checkBag();
    emptyBag();
    renderBag();
});

var bag = [],
    total = void 0;

/*==========  Empty the bag ==========*/

function emptyBag() {

    var clearBtn = selector('.empty-bag'),
        buyBtn = selector('.buy-now'),
        goods = selector('.shopping-bag__goods'),
        headerBag = selector('.state__bag'),
        totalCost = selector('.shopping-bag__total-cost_price');

    if (bag.length === 0) {
        goods.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
        goods.classList.add('shopping-bag__text');
        totalCost.innerHTML = '£0';
        localStorage.removeItem('total');
    }
    clearBag(clearBtn, 'Your shopping bag is empty. Use Catalog to add new items');
    clearBag(buyBtn, 'Thank you for your purchase');

    function clearBag(el, text) {
        el.on('click', function () {
            if (bag.length) goods.innerHTML = text;
            bag = [];
            localStorage.setItem('bag', bag);
            localStorage.removeItem('total');
            goods.classList.add('shopping-bag__text');
            headerBag.innerHTML = 'Bag (0)';
            totalCost.innerHTML = '£0';
            window.scrollTo(0, 0);
        });
    }
}

/*==========  Highlight item ==========*/

function highlightItem() {

    var product = selectorAll('.shopping-bag__product_img-overlay'),
        productName = selectorAll('.shopping-bag__description_name');
    [].forEach.call(product, function (item, i) {
        item.on('mouseover', function () {
            productName[i].style.color = '#f14a58';
        });
        item.on('mouseout', function () {
            productName[i].style.color = '';
        });
    });
}

/*==========  Check data in LocalStorage   ==========*/

function checkBag() {
    if (localStorage.getItem('bag')) bag = JSON.parse(localStorage.getItem('bag'));
    if (localStorage.getItem('total')) {
        total = JSON.parse(localStorage.getItem('total'));
        setTotal();
    }
}

function setTotal() {
    var headerBag = selector('.state__bag');
    headerBag.innerHTML = 'Bag ' + total['price'] + ' (' + total['amount'] + ')';
}

/*==========  Render shopping-bag  ==========*/

function renderBag() {
    checkBag();
    var goods = selector('.shopping-bag__goods'),
        totalCost = selector('.shopping-bag__total-cost_price');
    var productOut = '';
    if (bag.length) {
        bag.forEach(function (product) {
            productOut += '\n            <div class="shopping-bag__product">\n                <div class="shopping-bag__product_overlay">\n                    <img src="' + product['image'] + '" class="shopping-bag__product_img" alt="' + product['name'] + '">\n                    <div class="shopping-bag__product_img-overlay"><a href="#">View item</a></div>\n                </div>\n                <div class="shopping-bag__description">\n                    <strong class="shopping-bag__description_name">' + product['name'] + '</strong>\n                    <div class="shopping-bag__description_price">' + product['price'] + '</div>\n                    <div class="shopping-bag__description_characteristic shopping-bag__description_color">Color: ' + (product['color'] || product['colors'][0]) + '</div>\n                    <div class="shopping-bag__description_characteristic shopping-bag__description_size">Size: UK ' + (product['size'] || product['sizes'][0]) + '</div>\n                    <div class="shopping-bag__description_characteristic shopping-bag__description_quantity">Quantity: ' + product['amount'] + '</div>\n                    <button class="remove-item">Remove item</button>\n                </div>\n            </div>';
        });
        goods.innerHTML = productOut;
        totalCost.innerHTML = '\xA3' + total.price;
        var removeBtn = selectorAll('.remove-item');
        [].forEach.call(removeBtn, function (btn, i) {
            btn.on('click', function () {
                bag[i]['amount']--;
                total.amount--;
                total.price -= bag[i].price;
                if (bag[i]['amount'] < 1) bag.splice(i, 1);
                localStorage.setItem('bag', JSON.stringify(bag));
                localStorage.setItem('total', JSON.stringify(total));
                renderBag();
            });
        });
    } else {
        emptyBag();
    }

    highlightItem();
}