document.addEventListener('DOMContentLoaded', () => {
    renderFilter();
    filterDropdown();
    filterBar();
    checkBag();

    window.on('resize', () => { renderFilter() });

    loadGoods(showGoods);

});

let bag = [],
    total = {
        price : 0,
        amount : 0
    };


        /*==========  Filter dropdown mobile/tablet ==========*/

function filterDropdown() {

    const dropdownFilter = selector('.catalog__filter-list_select');
    dropdownFilter.on('click', function() {
        this.classList.toggle('filter-list_select-change');
        selector('.filter-dropdown').classList.toggle('hidden-filter');
    });

}

        /*==========   Dropdown filter desktop && rerender ==========*/

function renderFilter() {

    const value = selectorAll('.filter-item_value'),
          filterList = selector('.catalog__filter-list'),
          filterDropdown = selector('.filter-dropdown'),
          dropdownItems = selectorAll('.filter-dropdown__item'),
          catalog = selector('.catalog'),
          catalogItems = selectorAll('.catalog__filter-item');

    if(document.body.clientWidth >= 1024) {
        filterList.appendChild(filterDropdown);
        [].forEach.call(catalogItems, (item, i) => {
           item.on('mouseover', ()=> {
              dropdownItems[i].classList.add('visible');
           });
            item.on('mouseout', ()=> {
                dropdownItems[i].classList.remove('visible');
            });
            dropdownItems[i].on('mouseover', ()=> {
                dropdownItems[i].classList.add('visible');
            });
            dropdownItems[i].on('mouseout', () => {
                dropdownItems[i].classList.remove('visible');
            });
        });
    }else {
        [].forEach.call(value, (val) => {val.style.display = 'none'});
        document.body.insertBefore(filterDropdown, catalog);
    }

}


        /*==========  Filter bar ==========*/

function filterBar() {

    const filterDropdownList = selectorAll('.filter-dropdown__item_list');
    [].forEach.call(filterDropdownList,(list, i) => {
        const key = selectorAll('.filter-item_key');
        const value = selectorAll('.filter-item_value');
        const cache = key[i].innerHTML;
        [].forEach.call(list.children,(li) => {
            li.on('click', () => {
                [].forEach.call(list.children,(li) => { li.style.color = document.body.clientWidth >= 1024 ? '' : '#a8a8a8' });
                if(li.classList.contains('not-selected')) {
                    li.style.color = '#000';
                    key[i].innerHTML = cache;
                    key[i].style.color = '';
                    value[i].style.display = 'none';
                }else {
                    if(document.body.clientWidth >= 1024) value[i].style.display = 'block';
                    value[i].innerHTML = cache;
                    key[i].innerHTML = li.innerHTML;
                    key[i].style.color = '#f14a58';
                    li.style.color = '#f14a58';
                }
            });
        });
    });

}

            /*==========  Highlight item ==========*/

function highlightItem() {

    const product = selectorAll('.catalog__product_img-overlay'),
          productName = selectorAll('.catalog__product_name');
    [].forEach.call(product, (item, i) => {
        item.on('mouseover', () => { productName[i].style.color = '#f14a58' });
        item.on('mouseout', () => { productName[i].style.color = '' });
    });

}


            /*==========  Load goods from db  ==========*/

function loadGoods(fn) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'goods.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            fn(xhr.responseText);
        }
    };
    xhr.send();

}

            /*==========  Render goods  ==========*/

function showGoods(products) {

    let goods = JSON.parse(products),
        container = selector('.catalog__goods'),
        productOut = '';
    goods.forEach((product, i) => {
        productOut +=
            `<div class="catalog__product ${i>=8 ? "catalog__product_tablet" : ''}">
                    <div class="catalog__product_overlay">
                        <img src="${product['image']}" class="catalog__product_img" alt="${product['name']}">
                        <div class="catalog__product_img-overlay"><a href="#">View item</a></div>
                    </div>
                    <strong class="catalog__product_name">${product['name']}</strong>
                    <span class="catalog__product_price"><em class="product-note">${product['note'] || ''}</em> ${product['price'] ? '£' + product['price']: ''}</span>
                </div>`

    });
    container.innerHTML += productOut;
    highlightItem();

    const itemDetailLink = selectorAll('.catalog__product_img-overlay > a');
    [].forEach.call(itemDetailLink, (link, i) => {
        link.on('click', (e) => {
            e.preventDefault();
            loadItemPage(i, goods);
            window.scrollTo(0,0);
        });
    });

}


            /*==========  Render item-details page  ==========*/

function loadItemPage(i, goods) {

    const catalog = selector('.catalog'),
          filterList = selector('.catalog__filter-list'),
          xhr = new XMLHttpRequest();
    xhr. open('GET', 'custom-item-details.html');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status != 4) {
            catalog.outerHTML = xhr.responseText;
            filterList.style.display = 'none';
            loadProductData(i, goods);
        }
    };
    xhr.send();

}

        /*==========  Load data about this product  ==========*/

function loadProductData(i, goods) {
    const price = selector('.item-details__description_price'),
          name = selector('.item-details__description_header'),
          images = selectorAll('.item-details img'),
          fullImg = selector('.item-details__photos_full img'),
          addBtn = selector('.add-to-bag');

    fullImg.style.maxWidth = '60%';
    fullImg.style.paddingLeft = '20%';
    selectCharacteristics(goods[i]);

    name.innerHTML = goods[i]['name'];
    if(goods[i]['price']) price.innerHTML = '£' + goods[i]['price'];
    [].forEach.call(images, (image) => {
       image.setAttribute('src', goods[i]['image']);
    });


    addBtn.on('click', addToBag.bind(null, goods[i]));

}

        /*==========  Select characteristics of product  ==========*/

function selectCharacteristics(product) {
    const colors = selectorAll('.characteristics_color-item'),
          sizes = selectorAll('.characteristics_size-item');

    chooseChar(colors);
    chooseChar(sizes);

    function chooseChar(char) {
        [].forEach.call(char, (el, i) => {
            if(char === sizes) el.innerHTML = 'UK ' + product['sizes'][i];
            if(char === colors) el.innerHTML = product['colors'][i];
            el.on('click', () => {
                [].forEach.call(char, (el) => { el.style.border = '' });
                el.style.border = '1px solid #ccc';
                if(char === sizes) product['size'] = product['sizes'][i];
                if(char === colors) product['color'] = product['colors'][i];
            });
        });
    }
}

            /*==========  Add product to bag ==========*/

function addToBag(product) {
    checkBag();
    let isExist = false;
    if(bag.length) {
        bag.forEach((bagProd) => {
            console.log(bagProd);
            if(bagProd['name'] === product['name'] && bagProd['color'] === product['color'] && bagProd['size'] === product['size']) {
                bagProd['amount']++;
                total.amount++;
                total.price += +product['price'];
                isExist = true;
            }
        });
    }else {
        product['amount'] = 1;
        total.amount = 1;
        total.price += +product['price'];
        bag.push(product);
        isExist = true;
    }
    if(isExist === false) {
        total.amount++;
        total.price += +product['price'];
        product['amount'] = 1;
        bag.push(product);
    }

    setTotal();
    localStorage.setItem('bag', JSON.stringify(bag));
    localStorage.setItem('total', JSON.stringify(total));
}


            /*==========  Check data in LocalStorage  ==========*/

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


