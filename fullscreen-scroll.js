
const container = document.querySelector('.container');

let items = document.querySelectorAll(".container .item");
let tabs = [];
let fragment = document.createDocumentFragment();
items.forEach((item, i) => {
    let tab = document.createElement("div");
    if (i === 0) {
        tab.classList.add("current");
    }
    tab.innerHTML = item.dataset.title;
    tab.addEventListener("click", debounce(() => {
        goto(i);
    }, 200));
    tabs.push(tab);
    fragment.appendChild(tab);
})
let tabWrapper = document.querySelector(".tabs");
tabWrapper.appendChild(fragment);



container.addEventListener("mousewheel", debounce(handleMouseWheel, 200));

function handleMouseWheel(e) {
    e = e || window.event;
    e.preventDefault();
    console.log(e);
    let index = getCurrentIndex();
    if (e.wheelDelta < 0 && index < items.length - 1) {
        index++;
    } else if (e.wheelDelta > 0 && index > 0) {
        index--;
    } else {
        return;
    }
    goto(index);
    if (index === 1) {
        showTech();
    } else {
        hideTech();
    }
    changeCurrentIndex(index);
}

function changeCurrentIndex(i) {
    container.dataset.currentIndex = i;
}

function getCurrentIndex() {
    return container.dataset.currentIndex;
}

function goto(index) {
    const currentIndex = getCurrentIndex();
    items[currentIndex].classList.remove("current");
    tabs[currentIndex].classList.remove("current");
    items[index].classList.add("current");
    tabs[index].classList.add("current");
    changeCurrentIndex(index);
}

// 防抖
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

// 节流
function throttle(fn, threshhold = 200) {
    let timeout;
    let start = new Date();
    return function () {
        let context = this;
        let args = arguments;
        let curr = new Date();
        clearTimeout(timeout);
        if (curr - start >= threshhold) {
            fn.apply(context, args)
            start = curr
        } else {
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, threshhold);
        }
    }
}


function hideTech() {
    let techDiv = document.querySelector(".techBack");
    techDiv.style.display = "none";
}

function showTech() {
    setTimeout(() => {
        let techDiv = document.querySelector(".techBack");
        techDiv.style.display = "initial";
    }, 500)
}


window.onload = () => {
    changeCurrentIndex(0);
    hideTech();
}


