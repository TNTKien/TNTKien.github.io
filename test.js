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
                <div class="product__item__pic set-bg" data-setbg="${element.cover}">
                    <div class="ep">${element.status}</div>
                </div>
                <div class="product__item__text">
                    <h5><a href="">${element.title}</a>
                    </h5>
                </div>
            </div>
        </div>
      `;
  });
  return html;
};
getHomepage().then((html) => {
  document.getElementById("homepage").innerHTML = html;
});

async function getRandom() {
  const api = baseUrl + "api/random";
  const response = await fetch(api);
  const data = await response.json();
  
  const randomBooks = getRandoms(data, 5);
  let html = "";
  randomBooks.forEach((element) => {
    html += `
    <div class="product__sidebar__view__item set-bg mix day years"
      data-setbg="${element.cover}">
      <div class="ep">${element.status}</div>
      <h5><a href="">${element.title}</a></h5>
    </div>
      `;
  });

  return html;

};
getRandom().then((html) => {
  document.getElementById("random").innerHTML = html;
});

function getRandoms(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

