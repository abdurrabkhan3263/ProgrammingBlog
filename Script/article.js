const fragment = window.location.hash;
const id = fragment.substring(1);

const headingImage = document.querySelector("#heading-img");
let mainHeading = document.querySelector(".Heading");
let userImg = document.querySelector("#pub-img");
let pubName = document.querySelector(".pub-name");
let pubDate = document.querySelector(".pub-date");
let tags = document.querySelector(".tag");

function addValue(tag, coverImg, title, profileImg, userName, pubData) {
  headingImage.setAttribute("src", coverImg);
  mainHeading.innerHTML = title;
  userImg.setAttribute("src", profileImg);
  pubName.textContent = userName;
  pubDate.textContent = `Published At ${pubData}`;
  tag.forEach((value) => {
    let p = document.createElement("p");
    p.innerHTML = `#${value}`;
    tags.appendChild(p);
  });
}

function article() {
  fetch(`https://dev.to/api/articles/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let value = data.body_html;
      let path = document.querySelector(".article-section");
      path.innerHTML = value;
      addValue(
        data.tags,
        data.cover_image,
        data.title,
        data.user.profile_image_90,
        data.user.name,
        data.readable_publish_date
      );
    })
    .catch((error) => console.log(error));
}
article();

// CODE SECTION CODE
function addCoding(parent, data) {
  let pre = document.querySelector(".pre-code-full");
  let code = document.createElement("code");
  if (!pre.innerHTML == "") {
    pre.innerHTML = "";
  }
  code.innerHTML = data;
  pre.appendChild(code);
}

const body = document.querySelector("body");
let fullScreenC = document.querySelector(".code-fullScreen");
body.addEventListener("click", (event) => {
  if (event.target.classList.contains("highlight__panel-action")) {
    // ADDING CODE IN FULL SCREEN SECTION START

    let parent = event.target.parentElement.parentNode;
    let code = parent.querySelector("code");
    addCoding(fullScreenC, code.innerHTML);
    window.scrollTo({
      top: 0,
    });

    // ADDING CODE IN FULL SCREEN SECTION END

    gsap.to(fullScreenC, {
      scale: 1,
      opacity: 1,
    });
  }
});

// MAXIMIZE FULL SCREEN PANEL
const fullScreenBtn = document.querySelector(".fullScreen-btn");
fullScreenBtn.addEventListener("click", () => {
  gsap.to(".code-fullScreen", {
    scale: 0,
    opacity: 0,
  });
});
