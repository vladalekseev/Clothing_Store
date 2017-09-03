'use strict';

document.addEventListener('DOMContentLoaded', function () {
    renderFilter();
    filterDropdown();
    filterBar();
    checkBag();

    window.on('resize', function () {
        renderFilter();
    });

    loadGoods(showGoods);
});

var bag = [],
    total = {
    price: 0,
    amount: 0
};

/*==========  Filter dropdown mobile/tablet ==========*/

function filterDropdown() {

    var dropdownFilter = selector('.catalog__filter-list_select');
    dropdownFilter.on('click', function () {
        this.classList.toggle('filter-list_select-change');
        selector('.filter-dropdown').classList.toggle('hidden-filter');
    });
}

/*==========   Dropdown filter desktop && rerender ==========*/

function renderFilter() {

    var value = selectorAll('.filter-item_value'),
        filterList = selector('.catalog__filter-list'),
        filterDropdown = selector('.filter-dropdown'),
        dropdownItem = selectorAll('.filter-dropdown__item'),
        catalog = selector('.catalog');

    if (document.body.clientWidth >= 1024) {
        filterList.appendChild(filterDropdown);
        filterList.on('mouseover', function (e) {
            if (e.target.classList.contains('catalog__filter-item')) {
                var target = dropdownItem[+e.target.getAttribute('data-filter')];
                e.target.on('mousemove', function () {
                    target.classList.add('visible');
                });
                e.target.on('mouseout', function () {
                    target.classList.remove('visible');
                });

                target.on('mouseover', function () {
                    target.classList.add('visible');
                });
                target.on('mouseout', function () {
                    target.classList.remove('visible');
                });
            }
        });
    } else {
        [].forEach.call(value, function (val) {
            val.style.display = 'none';
        });
        document.body.insertBefore(filterDropdown, catalog);
    }
}

/*==========  Filter bar ==========*/

function filterBar() {

    var filterDropdownList = selectorAll('.filter-dropdown__item_list');
    [].forEach.call(filterDropdownList, function (list, i) {
        var key = selectorAll('.filter-item_key');
        var value = selectorAll('.filter-item_value');
        var cache = key[i].innerHTML;
        [].forEach.call(list.children, function (li) {
            li.on('click', function () {
                [].forEach.call(list.children, function (li) {
                    li.style.color = document.body.clientWidth >= 1024 ? '' : '#a8a8a8';
                });
                if (li.classList.contains('not-selected')) {
                    li.style.color = '#000';
                    key[i].innerHTML = cache;
                    key[i].style.color = '';
                    value[i].style.display = 'none';
                } else {
                    if (document.body.clientWidth >= 1024) value[i].style.display = 'block';
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

    var product = selectorAll('.catalog__product_img-overlay'),
        productName = selectorAll('.catalog__product_name');
    [].forEach.call(product, function (item, i) {
        item.on('mouseover', function () {
            productName[i].style.color = '#f14a58';
        });
        item.on('mouseout', function () {
            productName[i].style.color = '';
        });
    });
}

/*==========  Load goods from db  ==========*/

function loadGoods(fn) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'goods.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            fn(xhr.responseText);
        }
    };
    xhr.send();
}

/*==========  Render goods  ==========*/

function showGoods(products) {

    var goods = JSON.parse(products),
        container = selector('.catalog__goods'),
        productOut = '';
    goods.forEach(function (product, i) {
        productOut += '<div class="catalog__product ' + (i >= 8 ? "catalog__product_tablet" : '') + '">\n                    <div class="catalog__product_overlay">\n                        <img src="' + product['image'] + '" class="catalog__product_img" alt="' + product['name'] + '">\n                        <div class="catalog__product_img-overlay"><a href="#">View item</a></div>\n                    </div>\n                    <strong class="catalog__product_name">' + product['name'] + '</strong>\n                    <span class="catalog__product_price"><em class="product-note">' + (product['note'] || '') + '</em> ' + (product['price'] ? '£' + product['price'] : '') + '</span>\n                </div>';
    });
    container.innerHTML += productOut;
    highlightItem();

    var itemDetailLink = selectorAll('.catalog__product_img-overlay > a');
    [].forEach.call(itemDetailLink, function (link, i) {
        link.on('click', function (e) {
            e.preventDefault();
            loadItemPage(i, goods);
            window.scrollTo(0, 0);
        });
    });
}

/*==========  Render item-details page  ==========*/

function loadItemPage(i, goods) {

    var catalog = selector('.catalog'),
        filterList = selector('.catalog__filter-list'),
        xhr = new XMLHttpRequest();
    xhr.open('GET', 'custom-item-details.html');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status != 4) {
            catalog.outerHTML = xhr.responseText;
            filterList.style.display = 'none';
            loadProductData(i, goods);
        }
    };
    xhr.send();
}

/*==========  Load data about this product  ==========*/

function loadProductData(i, goods) {
    var price = selector('.item-details__description_price'),
        name = selector('.item-details__description_header'),
        images = selectorAll('.item-details img'),
        fullImg = selector('.item-details__photos_full img'),
        addBtn = selector('.add-to-bag');

    fullImg.style.maxWidth = '60%';
    fullImg.style.paddingLeft = '20%';
    selectCharacteristics(goods[i]);

    name.innerHTML = goods[i]['name'];
    if (goods[i]['price']) price.innerHTML = '£' + goods[i]['price'];
    [].forEach.call(images, function (image) {
        image.setAttribute('src', goods[i]['image']);
    });

    addBtn.on('click', addToBag.bind(null, goods[i]));
}

/*==========  Select characteristics of product  ==========*/

function selectCharacteristics(product) {
    var colors = selectorAll('.characteristics_color-item'),
        sizes = selectorAll('.characteristics_size-item');

    chooseChar(colors);
    chooseChar(sizes);

    function chooseChar(char) {
        [].forEach.call(char, function (el, i) {
            if (char === sizes) el.innerHTML = 'UK ' + product['sizes'][i];
            if (char === colors) el.innerHTML = product['colors'][i];
            el.on('click', function () {
                [].forEach.call(char, function (el) {
                    el.style.border = '';
                });
                el.style.border = '1px solid #ccc';
                if (char === sizes) product['size'] = product['sizes'][i];
                if (char === colors) product['color'] = product['colors'][i];
            });
        });
    }
}

/*==========  Add product to bag ==========*/

function addToBag(product) {
    checkBag();
    var isExist = false;
    if (bag.length) {
        bag.forEach(function (bagProd) {
            console.log(bagProd);
            if (bagProd['name'] === product['name'] && bagProd['color'] === product['color'] && bagProd['size'] === product['size']) {
                bagProd['amount']++;
                total.amount++;
                total.price += +product['price'];
                isExist = true;
            }
        });
    } else {
        product['amount'] = 1;
        total.amount = 1;
        total.price += +product['price'];
        bag.push(product);
        isExist = true;
    }
    if (isExist === false) {
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