var colors = ["#561ccd", "#a169e9", "#361bec", "#100091", "#fc7f0c", "#e51263"];

let wrapper = document.querySelector(".wrap");
draw();
wrapper.addEventListener("click", function () {
    draw();
})

function draw() {
    var cellClass = Array.from({ length: 6 }, (x, i) => "class" + i);
    setTimeout(function () {
        document.querySelectorAll(".wrap .cell .inner").forEach((inner, i) => {
            inner.classList.remove(...cellClass);
            inner.classList.add("class" + Math.floor(Math.random() * 11 + 1));
        })
        document.querySelectorAll(".wrap .cell").forEach((cell) => {
            cell.style.setProperty("--color1", colors[Math.floor(Math.random() * colors.length)]);
            cell.style.setProperty("--color2", colors[Math.floor(Math.random() * colors.length)]);
            cell.style.setProperty("--size", (Math.floor(Math.random() * 2) + 1) * 100 + "%");
            cell.style.setProperty("--angle", Math.floor(Math.random() * 4) * 90 + "deg");
            cell.style.setProperty("--radius", Math.floor(Math.random() * 2) * 100 + "vw");
        })
    }, 0);
}
