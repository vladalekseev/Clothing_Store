'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = createElement;
function createElement(tag, props, parent) {
    var element = document.createElement(tag);
    Object.keys(props).forEach(function (key) {
        element[key] = props[key];
    });
    parent && parent.appendChild(element);

    for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
    }

    children.forEach(function (child) {
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