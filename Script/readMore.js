let moreBtn = document.querySelector(".read-later");
let moreSection = document.querySelector(".read-more");
let deleteBtn = document.querySelectorAll(".read-more-delete");
let moreCard = document.querySelector(".more-section");

let localData = JSON.parse(localStorage.getItem("ids"));

function addingHtml(image, id, name) {
  let card = document.createElement("div");
  card.classList.add("read-more-card");
  card.innerHTML = `
  <div class="read-more-card-img">
                <img
                  src="${image}"
                  alt="img"
                  class="read-more-img"
                  onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqNdH4rC5njlxoA0Iwru70QCslWJItVBH2Q&amp;usqp=CAU'"
                />
              </div>
              <div class="read-more-info">
                <a href="/article.html#${id}"
                  ><h4 class="read-more-heading" id="${id}">${name}</h4></a
                >
              </div>
            </div>
  `;
  let icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark", "read-more-delete");
  card.appendChild(icon);
  return card;
}

function showData() {
  let readCard = document.querySelectorAll(".read-more-card");
  let localData = JSON.parse(localStorage.getItem("ids"));
  localData.forEach((value, index) => {
    let parentCard = readCard[index];
    let img = value.img;
    let ids = value.id;
    let heading = value.name;
    if (parentCard) {
      let id = parentCard
        .querySelector(".read-more-heading")
        .getAttribute("id");
      if (ids !== id) {
        let card = addingHtml(img, ids, heading);
        moreCard.appendChild(card);
      }
    } else {
      let card = addingHtml(img, ids, heading);
      moreCard.appendChild(card);
    }
  });
}

let counter = 0;
moreBtn.addEventListener("click", () => {
  let localData = JSON.parse(localStorage.getItem("ids"));
  if (counter == 0) {
    if (localData && localData.length > 0) {
      moreSection.style.transform = `scaleY(100%)`;
      showData();
    } else {
      let dataSection = document.querySelector(".dataNot-found");
      dataSection.style.top = "2px";
      setTimeout(() => {
        dataSection.style.top = "-30px";
      }, 1000);
    }
    counter++;
  } else {
    moreSection.style.transform = `scaleY(0%)`;
    counter = 0;
  }
});

// REMOVE AND RETURN ADD INTO THE LOCALSTORAGE

function returnAddingLocal() {
  let allCards = document.querySelectorAll(".read-more-card");
  let data = [];
  allCards.forEach((value) => {
    let img = value.querySelector(".read-more-img").getAttribute("src");
    let name = value.querySelector(".read-more-heading");
    let id = name.getAttribute("id");
    name = name.textContent;
    data.push({ img, name, id });
  });
  localStorage.setItem("ids", JSON.stringify(data));
}

document.querySelector("body").addEventListener("click", function (e) {
  if (e.target.classList.contains("read-more-delete")) {
    e.target.parentNode.remove();
    returnAddingLocal();
  }
});

let moreSecWidth = moreSection.getBoundingClientRect().width;

document.addEventListener("click", (e) => {
  if (moreSecWidth === 300) {
    const excludedClasses = [
      "fa-solid",
      "fa-xmark",
      "read-more-delete",
      "read-more-heading",
      "read-more-card",
      "more-section",
      "read-more",
      "read-later",
      "nav-button",
    ];
    let isExcluded = false;
    let currentElement = e.target;
    if (
      excludedClasses.some((className) =>
        currentElement.classList.contains(className)
      )
    ) {
      isExcluded = true;
    }
    if (!isExcluded) {
      moreSection.style.transform = `scaleY(0%)`;
    }
  }
});
