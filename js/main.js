

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(50).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
        // alert("Để cho đẹp thôi chứ chả tác dụng gì đâu 🐧")
    });

    $('.search-model-form').on('submit', async function () {
        const input = $('#search-input').val();
        if(!input) {
            $('.search-model').fadeOut(400, function () {
                $('#search-input').val('');
            });
            return;
        }

        const api = "https://bltx-backend-677c381e9aae.herokuapp.com/api/search?key=" + input;
        const response = await fetch(api);
        const data = await response.json();
        if (data.length == 0) {
            $('#hometitle').html(`<h4>Kết quả:</h4>`);
            $('#homepage').html(`<h5 style="padding-left:15px">Không tìm thấy truyện nào!</h5>`);
            $('.search-model').fadeOut(400, function () {});
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
        $('#hometitle').html(`<h4>Kết quả:</h4>`);
        $('#homepage').html(html);
        $('.search-model').fadeOut(400, function () {});
        
    });

    $('.icon_profile').on('click', function () {
        alert("Để cho đẹp thôi chứ chả tác dụng gì đâu 🐧")
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
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
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
     });

})(jQuery);
