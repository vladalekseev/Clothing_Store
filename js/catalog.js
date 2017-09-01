document.addEventListener('DOMContentLoaded', () => {

    renderFilter();
    filterDropdown();
    highlightItem();
    filterBar();

    window.on('resize', () => { renderFilter() });

});


        /*==========  Filter dropdown ==========*/
function filterDropdown() {
    var dropdownFilter = selector('.catalog__filter-list_select');
    dropdownFilter.on('click', function() {
        this.classList.toggle('filter-list_select-change');
        selector('.filter-dropdown').classList.toggle('hidden-filter');
    });
}


        /*==========  Highlight item ==========*/
function highlightItem() {

    var product = selectorAll('.catalog__product_img-overlay');
    var productName = selectorAll('.catalog__product_name');
    [].forEach.call(product, (item, i) => {
        item.on('mouseover', () => { productName[i].style.color = '#f14a58' });
        item.on('mouseout', () => { productName[i].style.color = '' });
    });

}


function renderFilter() {

    var value = selectorAll('.filter-item_value'),
        filterList = selector('.catalog__filter-list'),
        filterDropdown = selector('.filter-dropdown'),
        dropdownItem = selectorAll('.filter-dropdown__item'),
        catalog = selector('.catalog');

    if(document.body.clientWidth >= 1024) {
        filterList.appendChild(filterDropdown);
        filterList.on('mouseover', (e) => {
            if(e.target.classList.contains('catalog__filter-item')) {
                var target = dropdownItem[+e.target.getAttribute('data-filter')];
                e.target.on('mousemove', () => { target.classList.add('visible') });
                e.target.on('mouseout', () => { target.classList.remove('visible') });

                target.on('mouseover', () => { target.classList.add('visible') });
                target.on('mouseout', () => { target.classList.remove('visible') });
            }
        });
    }else {
        [].forEach.call(value, (val) => {val.style.display = 'none'});
        document.body.insertBefore(filterDropdown, catalog);
    }

}


        /*==========  Filter bar ==========*/

function filterBar() {

    var filterDropdownList = selectorAll('.filter-dropdown__item_list');
    [].forEach.call(filterDropdownList,(list, i) => {
        var key = selectorAll('.filter-item_key');
        var value = selectorAll('.filter-item_value');
        var cache = key[i].innerHTML;
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




function selector(selector) {
    return document.querySelector(selector);
}
function selectorAll(selector) {
    return document.querySelectorAll(selector);
}
Object.prototype.on = function(event, fn) {
    this.addEventListener(event, fn);
};




