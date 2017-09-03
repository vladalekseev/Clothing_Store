document.addEventListener('DOMContentLoaded', () => {
    checkBag();
    emptyBag();
    renderBag();


});

let bag = [],
    total;

        /*==========  Empty the bag ==========*/

function emptyBag() {

    const clearBtn = selector('.empty-bag'),
          buyBtn = selector('.buy-now'),
          goods = selector('.shopping-bag__goods'),
          headerBag = selector('.state__bag'),
          totalCost = selector('.shopping-bag__total-cost_price');

    if(bag.length === 0) {
        goods.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
        goods.classList.add('shopping-bag__text');
        totalCost.innerHTML = '£0';
        localStorage.removeItem('total');
    }
    clearBag(clearBtn, 'Your shopping bag is empty. Use Catalog to add new items');
    clearBag(buyBtn, 'Thank you for your purchase');

    function clearBag(el, text) {
        el.on('click', () => {
            if(bag.length) goods.innerHTML = text;
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

    const product = selectorAll('.shopping-bag__product_img-overlay'),
          productName = selectorAll('.shopping-bag__description_name');
    [].forEach.call(product, (item, i) => {
        item.on('mouseover', () => { productName[i].style.color = '#f14a58' });
        item.on('mouseout', () => { productName[i].style.color = '' });
    });

}

        /*==========  Check data in LocalStorage   ==========*/

function checkBag() {
    if(localStorage.getItem('bag')) bag = JSON.parse(localStorage.getItem('bag'));
    if(localStorage.getItem('total')) {
        total = JSON.parse(localStorage.getItem('total'));
        setTotal();
    }

}

function setTotal() {
    const headerBag = selector('.state__bag');
    headerBag.innerHTML = `Bag ${total['price']} (${total['amount']})`;
}


        /*==========  Render shopping-bag  ==========*/

function renderBag() {
    checkBag();
    const goods = selector('.shopping-bag__goods'),
          totalCost = selector('.shopping-bag__total-cost_price');
    let productOut = '';
    if(bag.length) {
        bag.forEach((product) => {
            productOut += `
            <div class="shopping-bag__product">
                <div class="shopping-bag__product_overlay">
                    <img src="${product['image']}" class="shopping-bag__product_img" alt="${product['name']}">
                    <div class="shopping-bag__product_img-overlay"><a href="#">View item</a></div>
                </div>
                <div class="shopping-bag__description">
                    <strong class="shopping-bag__description_name">${product['name']}</strong>
                    <div class="shopping-bag__description_price">${product['price']}</div>
                    <div class="shopping-bag__description_characteristic shopping-bag__description_color">Color: ${product['color'] || product['colors'][0]}</div>
                    <div class="shopping-bag__description_characteristic shopping-bag__description_size">Size: UK ${product['size'] || product['sizes'][0]}</div>
                    <div class="shopping-bag__description_characteristic shopping-bag__description_quantity">Quantity: ${product['amount']}</div>
                    <button class="remove-item">Remove item</button>
                </div>
            </div>`

        });
        goods.innerHTML = productOut;
        totalCost.innerHTML = `£${total.price}`;
        const removeBtn = selectorAll('.remove-item');
        [].forEach.call(removeBtn, (btn, i) => {
            btn.on('click', () => {
                bag[i]['amount']--;
                total.amount--;
                total.price -= bag[i].price;
                if(bag[i]['amount'] < 1) bag.splice(i,1);
                localStorage.setItem('bag', JSON.stringify(bag));
                localStorage.setItem('total', JSON.stringify(total));
                renderBag();
            });
        });

    }else {
        emptyBag();
    }

    highlightItem();


}
