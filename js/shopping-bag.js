document.addEventListener('DOMContentLoaded', () => {
    emptyBag(highlightItem);


});

        /*==========  Empty the bag ==========*/

function emptyBag(fn) {
    var clearBtn = selector('.empty-bag'),
        buyBtn = selector('.buy-now'),
        goods = selector('.shopping-bag__goods'),
        bag = selector('.state__bag > a'),
        totalCost = selector('.shopping-bag__total-cost_price'),
        arr = [1,2,3,4];

    clearBag(clearBtn, 'Your shopping bag is empty. Use Catalog to add new items');
    clearBag(buyBtn, 'Thank you for your purchase');

    function clearBag(el, text) {
        el.on('click', () => {
            if(arr.length) goods.innerHTML = text;
            arr = [];
            goods.classList.add('shopping-bag__text');
            bag.innerHTML = 'Bag (0)';
            totalCost.innerHTML = '£0';
            window.scrollTo(0, 0);
        });
    }
    fn();
}

        /*==========  Highlight item ==========*/

function highlightItem() {

    var product = selectorAll('.shopping-bag__product_img-overlay');
    var productName = selectorAll('.shopping-bag__description_name');
    [].forEach.call(product, (item, i) => {
        item.on('mouseover', () => { productName[i].style.color = '#f14a58' });
        item.on('mouseout', () => { productName[i].style.color = '' });
    });

}


//  Helpers

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