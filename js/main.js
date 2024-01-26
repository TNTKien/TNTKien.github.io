"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(50).fadeOut("slow");

    /*------------------
            FIlter
        --------------------*/
    $(".filter__controls li").on("click", function () {
      $(".filter__controls li").removeClass("active");
      $(this).addClass("active");
    });
    if ($(".filter__gallery").length > 0) {
      var containerEl = document.querySelector(".filter__gallery");
      var mixer = mixitup(containerEl);
    }
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  // Search model
  $(".search-switch").on("click", function () {
    $(".search-model").fadeIn(400);
    // alert("Để cho đẹp thôi chứ chả tác dụng gì đâu 🐧")
  });
  $("#shorten_form").on("submit", async function (event) {
    event.preventDefault();
    const input = $("#shorten_input").val();
    if (!input) {
      $("#shorten_input").val("");
      return alert("Bạn chưa điền link!");
    }
    //check if input is url
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!urlRegex.test(input)) {
      $("#shorten_input").val("");
      return alert("Link không hợp lệ!");
    }

    const api =
      "https://db.baclethanxa.me/api/shorten?url=" +
      input;

    const response = await fetch(api);
    const res = await response.text();

    const shortenUrl = "https://baclethanxa.me/s/" + res;
    navigator.clipboard.writeText(shortenUrl);

    $("#shorten_output").val(shortenUrl);

    setTimeout(function () {
      alert("Rút gọn thành công!");
    }, 500);
  });

  $("#shorten_output").on("click", function () {
    const output = $("#shorten_output").val();
    if (!output) {
      return;
    }
    navigator.clipboard.writeText(output);
    alert("Đã copy vào clipboard!");
  });

  $(".search-model-form").on("submit", async function (event) {
    event.preventDefault();
    const input = $("#search-input").val();
    if (!input) {
      $(".search-model").fadeOut(400, function () {
        $("#search-input").val("");
      });
      return;
    }

    const api =
      "https://db.baclethanxa.me/api/search?key=" + input;
    const response = await fetch(api);
    const data = await response.json();
    if (data.length == 0) {
      $("#hometitle").html(`<h4>Kết quả:</h4>`);
      $("#homepage").html(
        `<h5 style="padding-left:15px">Không tìm thấy truyện nào!</h5>`
      );
      $(".search-model").fadeOut(400, function () {});
      return;
    }
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
    $("#hometitle").html(`<h4>Kết quả:</h4>`);
    $("#homepage").html(html);
    $(".search-model").fadeOut(400, function () {});
  });

  $(".search_form").on("submit", async function (event) {
    event.preventDefault();
    const input = $("#searchQueryInput").val();
    //get checked tags
    const tags = [];
    $('input[name="tag[]"]:checked').each(function () {
      tags.push($(this).parent().text().trim());
    });

    if (!input && tags.length == 0) {
      return alert("Bạn chưa điền gì cả!");
    }

    const inputval = `name: '${input}' & tag: '${tags.join(", ")}'`;
    $("#result").removeAttr("hidden");
    $(".tags").attr("hidden", true);
    const api =
      "https://db.baclethanxa.me/api/search?key=" +
      input +
      "&tags=" +
      tags.join(",");
    const response = await fetch(api);
    const data = await response.json();
    if (data.length == 0) {
      $(".section-title").html(`<h4>Không tìm thấy truyện nào!</h4>`);
      $("#searchQueryInput").val("");
      $("#searchQueryInput").attr("placeholder", inputval);
      $("#result").attr("hidden", true);
      $(".tags").removeAttr("hidden");
      return;
    }
    data.reverse();
    let html = "";
    data.forEach((element) => {
      let tagList = "";
      if (element.tags && element.tags.length) {
        tagList = element.tags
          .slice(0, 5)
          .map((tag) => `<li class="cate-item">${tag}</li>`)
          .join("\n");
        if (element.tags.length > 5) {
          const remainingTags = element.tags.slice(5).join(", ");
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
                <ul class="product__item__list">
                  ${tagList}
                </ul>
                <h5><a href="${element.url}">${element.title}</a></h5>
              </div>
            </div>
        </div>
      `;
    });
    $(".section-title").html(`<h4>Kết quả cho:</h4>`);
    $("#searchQueryInput").val("");
    $("#searchQueryInput").attr("placeholder", inputval);
    
    $("#respage").html(html);
    
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

  $(".icon_profile").on("click", function () {
    alert("Để cho đẹp thôi chứ chả tác dụng gì đâu 🐧");
  });

  $(".search-close-switch").on("click", function () {
    $(".search-model").fadeOut(400, function () {
      $("#search-input").val("");
    });
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
		Hero Slider
	--------------------*/
  var hero_s = $(".hero__slider");
  hero_s.owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: true,
    nav: true,
    navText: [
      "<span class='arrow_carrot-left'></span>",
      "<span class='arrow_carrot-right'></span>",
    ],
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    mouseDrag: false,
  });

  /*------------------
        Video Player
    --------------------*/
  const player = new Plyr("#player", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "captions",
      "settings",
      "fullscreen",
    ],
    seekTime: 25,
  });

  /*------------------
        Niceselect
    --------------------*/
  $("select").niceSelect();

  /*------------------
        Scroll To Top
    --------------------*/
  $("#scrollToTopButton").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
})(jQuery);
