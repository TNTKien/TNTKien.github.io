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
      //<div class="comment"><i class="fa fa-thumbs-up"></i> 11</div>
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

// function randomTrending(){
//   const divList = [
//     `<div class="product__item" bis_skin_checked="1">
//       <a href="https://hentaivn.tv/33545-doc-truyen-toi-chuyen-sinh-thanh-loli.html">
//         <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/300/1694292447-cover.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1694292447-cover.jpg&quot;);" bis_skin_checked="1">
//             <div class="ep" bis_skin_checked="1">Ongoing</div>
//         </div>
//       </a>
//       <div class="product__item__text" bis_skin_checked="1">
//           <h5><a href="https://hentaivn.tv/33545-doc-truyen-toi-chuyen-sinh-thanh-loli.html">Tôi chuyển sinh thành loli!</a>
//           </h5>
//       </div>
//     </div>`,
//     `<div class="product__item" bis_skin_checked="1">
//     <a href="https://hentaivn.tv/28817-doc-truyen-cau-chuyen-ve-nhung-valkyrie-nu-phu-thuy-.html">
//       <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/300/1700896141-001.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1700896141-001.jpg&quot;);" bis_skin_checked="1">
//           <div class="ep" bis_skin_checked="1">Ongoing</div>
//       </div>
//     </a>
//     <div class="product__item__text" bis_skin_checked="1">
//         <h5><a href="https://hentaivn.tv/28817-doc-truyen-cau-chuyen-ve-nhung-valkyrie-nu-phu-thuy-.html">Câu chuyện về những Valkyrie! ~Nữ phù thuỷ~</a>
//         </h5>
//     </div>
//   </div>`,
//   `<div class="product__item" bis_skin_checked="1">
//   <a href="https://hentaivn.tv/18383-doc-truyen-no-le-tai-meo.html">
//     <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/300/1699475143-00.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1699475143-00.jpg&quot;);" bis_skin_checked="1">
//         <div class="ep" bis_skin_checked="1">Ongoing</div>
//     </div>
//   </a>
//   <div class="product__item__text" bis_skin_checked="1">
//       <h5><a href="https://hentaivn.tv/18383-doc-truyen-no-le-tai-meo.html">Nô lệ tai mèo</a>
//       </h5>
//   </div>
// </div>`
//   ]

//   return divList[Math.floor(Math.random() * divList.length)];
// };

//make a random trending every 2s
// setInterval(function(){
//   document.getElementById("trend").innerHTML = randomTrending();
// }, 2000);