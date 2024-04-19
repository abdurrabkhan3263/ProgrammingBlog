export default function postCard(img, title, para, id) {
  let div = document.createElement("div");
  div.classList.add("post-recent");
  div.innerHTML = `
    <div class="post-img">
    <img class="card-img" src="${img}" id='${id}' alt="img" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqNdH4rC5njlxoA0Iwru70QCslWJItVBH2Q&usqp=CAU'"></div>
              <div class="post-heading">
                <a href="/article.html#${id}"><h2 class="card-heading">${title.slice(
    0,
    45
  )}...</h2></a>
                <p class="card-para">${para.slice(0, 80)}...</p>
              </div>
                <button class="main-read-later" id=${id}>Read Later</button>
    `;
  return div;
}
