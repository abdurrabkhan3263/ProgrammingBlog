let btn = document.querySelector(".nav-bar-btn");
let navSec = document.querySelector(".mobile-nav");

function navAnimation() {
  let transform = navSec.getBoundingClientRect().x >= -200 ? -102 : 0;
  navSec.style.transform = `translateX(${transform}%)`;
}

btn.addEventListener("click", () => {
  navAnimation();
});

document.querySelector("body").addEventListener("click", (e) => {
  let arr = ["fa-solid", "mobile-nav"];
  let f = arr.some((val) => e.target.classList.contains(val));
  let transform = navSec.getBoundingClientRect().x;
  if (!f && transform >= -265) {
    navSec.style.transform = `translateX(-102%)`;
  }
});
