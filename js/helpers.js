export function createElement(tag, props, parent, ...children) {
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

export { createElement, selector, selectorAll };