import apiHandling from "./api.js";
import postCard from "./addPost.js";

// MAKING OUR OWEN METHOD
String.prototype.removeSpace = function () {
  let value = "";
  for (let i = 0; i < this.length; i++) {
    if (this[i] == " ") {
      continue;
    }
    value = value + this[i];
  }
  return value;
};

let pageNum = 1;
let title = "javascript";
let postSection = document.querySelector(".blog-section");
let data;
let loadingBtn = document.querySelector("#loading-btn");

async function getData(page, title) {
  data = await apiHandling(page, title);
  if (data !== undefined) {
    addData(data);
  } else {
    loadingBtn.style.display = "none";
  }
}

const addData = async (value) => {
  let data = await value;
  await data.forEach((value) => {
    let post = postCard(
      value.cover_image,
      value.title,
      value.description,
      value.id
    );

    postSection.appendChild(post);
  });
};

getData(pageNum, title);

let button = document.getElementsByClassName("diff-btn");

Array.from(button).forEach((value, index) => {
  value.addEventListener("click", (e) => {
    Array.from(button).forEach((btn) => {
      if (btn.classList.contains("clickBtn")) {
        btn.classList.replace("clickBtn", "tag");
        e.target.classList.replace("tag", "clickBtn");
      }
    });
    if (!postSection == "") {
      postSection.innerHTML = "";
    }
    let tagVal = e.target.textContent.toLowerCase();
    title = tagVal.removeSpace();
    getData(pageNum, title);
  });
});

// LOADING MORE BTN CODE
loadingBtn.addEventListener("click", () => {
  pageNum += 1;
  getData(pageNum, title);
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
    let id = e.target.getAttribute("id");
    let parent = e.target.closest("div");
    let img = parent.querySelector(".card-img");
    let heading = parent.querySelector(".card-heading");
    setInlocal(img.src, heading.innerHTML, id);
  }
});

// LOADING MORE BTN CODE
loadingBtn.addEventListener("click", () => {
  pageNum += 1;
  getData(pageNum, title);
});
