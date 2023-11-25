const baseUrl = "https://bltx-backend-677c381e9aae.herokuapp.com/";

async function getHomepage() {
  const api = baseUrl + "api/books";
  const response = await fetch(api);
  const data = await response.json();
  let html = "";
  data.forEach((element) => {
    html += `
        <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <a href="${element.url}">
                <div class="product__item__pic set-bg" data-setbg="${element.cover}" style="background-image: url(&quot;${element.cover}&quot;);">
                    <div class="ep">${element.status}</div>
                </div>
              </a>
              <div class="product__item__text">
                  <h5><a href="${element.url}">${element.title}</a>
                  </h5>
              </div>
            </div>
        </div>
      `;
  });
  return html;
}
getHomepage().then((html) => {
  document.getElementById("homepage").innerHTML = html;
});

async function getRandom() {
  const api = baseUrl + "api/random";
  const response = await fetch(api);
  const data = await response.json();
  const limit = (data.length * 2) / 3;
  const randomBooks = getRandoms(data, limit.toFixed(0));
  let html = "";
  randomBooks.forEach((element) => {
    html += `
    <a href="${element.url}">
      <div class="product__sidebar__view__item set-bg mix day years" data-setbg="${element.cover}" style="background-image: url(&quot;${element.cover}&quot;);">
        <div class="ep">${element.status}</div>
        <h5><b>${element.title}</b></h5>
      </div>
    </a>
      `;
  });

  return html;
}

getRandom().then((html) => {
  document.getElementById("random").innerHTML = html;
});

// getBanner().then((html) => {
//   document.getElementById("banner").innerHTML = html;
// });

function getRandoms(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}