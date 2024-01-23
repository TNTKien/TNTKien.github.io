const baseUrl = "https://bltx-backend-677c381e9aae.herokuapp.com/";

async function getHomepage() {
  const api = baseUrl + "api/books";
  const response = await fetch(api);
  const data = await response.json();
  let html = "";
  data.forEach((element) => {
    let tagList = '';
    if (element.tags && element.tags.length) {
      tagList = element.tags.slice(0, 5).map((tag) => `<li class="cate-item">${tag}</li>`).join("\n");
      if (element.tags.length > 5) {
        const remainingTags = element.tags.slice(5).join(', ');
        tagList += `\n<li class="cate-item"><a href="#" onclick="event.preventDefault();"><span title="${remainingTags}">...</span></a></li>`;
      }
    }

    html += `
        <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <a href="${element.url}">
                <div class="product__item__pic set-bg lazy" data-src="${element.cover}">
                    <div class="ep">${element.status}</div>
                </div>
              </a>
              <div class="product__item__text">
                <h5><a href="${element.url}">${element.title}</a></h5>
                <ul class="product__item__list">
                  ${tagList}
                </ul>
              </div>
            </div>
        </div>
      `;
      //<div class="comment"><i class="fa fa-thumbs-up"></i> 11</div>
  });
  const limit = (data.length * 2) / 3;
  const randomBooks = getRandoms(data, limit.toFixed(0));
  let htmlRandom = "";
  randomBooks.forEach((element) => {
    htmlRandom += `
    <a href="${element.url}">
      <div class="product__sidebar__view__item set-bg mix day years lazy" data-src="${element.cover}">
        <div class="ep">${element.status}</div>
      </div>
      <h5><b>${element.title}</b></h5>
      <br>
    </a>
      `;
  });

  return {html, htmlRandom};
}
getHomepage().then((data) => {
  document.getElementById("homepage").innerHTML = data.html;
  document.getElementById("random").innerHTML = data.htmlRandom;

  // Set up Intersection Observer after the HTML is added to the page
  const lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// getBanner().then((html) => {
//   document.getElementById("banner").innerHTML = html;
// });

function getRandoms(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
//style="background-image: url('./img/plh.png');"
// function randomTrending(){
//   const divList = [
//     `<div class="product__item" bis_skin_checked="1">
//       <a href="https://hentaivn.tv/33545-doc-truyen-toi-chuyen-sinh-thanh-loli.html">
//         <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/1200/1694292447-cover.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1694292447-cover.jpg&quot;);" bis_skin_checked="1">
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
//       <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/1200/1700896141-001.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1700896141-001.jpg&quot;);" bis_skin_checked="1">
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
//     <div class="product__item__pic set-bg" data-setbg="https://t.htvncdn.net/images/1200/1699475143-00.jpg" style="background-image: url(&quot;https://t.htvncdn.net/images/300/1699475143-00.jpg&quot;);" bis_skin_checked="1">
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

// //make a random trending every 2s
// setInterval(function(){
//   document.getElementById("trend").innerHTML = randomTrending();
// }, 2000);