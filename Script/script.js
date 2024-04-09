// HANDELING API OF DEV
import apiHandling from "./api.js";
import postCard from "./addPost.js";

let pageNum = 1;
let postSection = document.querySelector(".blog-section");
let loadBtn = document.querySelector("#loading-btn");

async function addHtml() {
  let apiData = await apiHandling(pageNum, "programming");
  if (apiData !== undefined) {
    apiData.forEach((value) => {
      let post = postCard(
        value.cover_image,
        value.title,
        value.description,
        value.id
      );
      postSection.appendChild(post);
    });
  } else {
    loadBtn.style.display = "none";
  }
}
addHtml();

// ADD READ LATER CODE

postSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-img")) {
    let id = e.target.getAttribute("id");
    window.location.href = `/article.html#${id}`;
  }
});

function setInlocal(img, name, id) {
  let localData = JSON.parse(localStorage.getItem("ids"));
  if (!localData) {
    localStorage.setItem("ids", JSON.stringify([{ img, name, id }]));
  } else {
    localData.push({ img, name, id });
    localStorage.setItem("ids", JSON.stringify(localData));
  }
}

document.querySelector("body").addEventListener("click", function (e) {
  if (e.target.classList.contains("main-read-later")) {
    let parent = e.target.closest("div");
    let id = e.target.getAttribute("id");
    let img = parent.querySelector(".card-img");
    let heading = parent.querySelector(".card-heading");
    setInlocal(img.src, heading.innerHTML, id);
  }
});

let heroSection = document.querySelector(".hero-section");
loadBtn.addEventListener("click", () => {
  pageNum = pageNum + 1;
  addHtml();
});
