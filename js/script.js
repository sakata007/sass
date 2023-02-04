

//ハンバーガーメニュー
$(function () {
  $('#hamburger-btn').click(function () {
    $('body').toggleClass('is-drawer-active')

    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', 'true')
      $('#drawer').attr('area-hidden','false')
    } else {
      $(this).attr('aria-expanded', 'false')
      $('#drawer').attr('area-hidden','true')
    }
  })

  $('.header__list a[href]').on('click', function() {
    $('#hamburger-btn').trigger('click');
  });
});


// ハンバーガーメニュー展開時の背景固定
$(function () {
  $("#hamburger-btn").click(function () {
    // トリガーをクリックした時の条件分岐
    if ($(this).hasClass("is-active")) {
      // ナビを閉じるときの処理
      $("html").removeClass("is-fixed"); // 背景固定解除！
    } else {
      // ナビを開くときの処理
      $("html").addClass("is-fixed"); // 背景固定！
    }
    $("#hamburger-btn").toggleClass("is-active");
  });
});



//上にスクロールするとヘッダーが出てくる(トップページ)
$(function() {
  let pos = 0;
  $(window).on('scroll', function () {
    const $header = $('.header');
    const $main = $('main');
    const headerHeight = $header.outerHeight();
    const docmentHeight = $(document).height();
    const footerHeight = $('.footer').outerHeight();
    const currentPos = $(this).scrollTop();

    if (currentPos > (docmentHeight - footerHeight)) {
      $header.removeClass("is-fixed");
      $main.css("margin-top", 0);
    } else if (currentPos > headerHeight) {
      $header.addClass("is-fixed");
    } else {
      $header.removeClass("is-fixed");
      $main.css("margin-top", 0);
    }

    // 上スクロール時
    if (currentPos < pos) {
      $header.css('top', 0);
    } else {
      $header.css('top', -headerHeight);
    }

    pos = currentPos;
  });
});



//下層ページ
$(function() {
  let pos = 0;
  $(window).on('scroll', function () {
    const $subHeader = $('.sub-header');
    const $subMain = $('main');
    const subHeaderHeight = $subHeader.outerHeight();
    const subDocmentHeight = $(document).height();
    const subFooterHeight = $('.sub-footer').outerHeight();
    const subCurrentPos = $(this).scrollTop();

    if (subCurrentPos > (subDocmentHeight - subFooterHeight)) {
      $subHeader.removeClass("is-fixed");
      $subMain.css("margin-top", 0);
    } else if (subCurrentPos > subHeaderHeight) {
      $subHeader.addClass("is-fixed");
    } else {
      $subHeader.removeClass("is-fixed");
      $subMain.css("margin-top", 0);
    }

    // 上スクロール時
    if (subCurrentPos < pos) {
      $subHeader.css('top', 0);
    } else {
      $subHeader.css('top', -subHeaderHeight);
    }

    pos = subCurrentPos;
  });
});



//全ページ　スクロールするとコンテンツをフェードインで表示
$(function() {
  $(window).scroll(function() {
    fadeAnime();
  });
  
  function fadeAnime() {
    $('.js-fade-up').each(function() {
      let flag = false;
      let target = $(this).offset().top -= 50;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      if(scroll > target - windowHeight + 200) {
        if (!flag) {
          flag = true;
          $(this).addClass('is-fade-up');
        } else {
          $(this).removeClass('is-fade-up');
        }
      }
    });
  };    
});


//トップページ　スクロールするとヘッダーメニューの色とロゴを変える
$(function() {
  let headerItem = $('.nav-pc__item');
  let headerLogo = $('.header__logo--pc').find('img');
  let hamburger = $('.hamburger__line');
  let headerLogoSp = $('.header__logo--sp').find('img');
  let target = $(".services-top").offset().top;

  $(window).on("scroll", function() {
    let currentPos = $(window).scrollTop();
    if(currentPos > target) {
      headerItem.addClass('is-active');
      headerLogo.attr('src', 'imgs/png/type01_b.png');
      hamburger.addClass('is-active');
      headerLogoSp.attr('src', 'imgs/bc/logomark.svg').css('width', 30);
    } else{
      headerItem.removeClass('is-active');
      headerLogo.attr('src', 'imgs/png/type01_b_w.png');
      hamburger.removeClass('is-active');
      headerLogoSp.attr('src', 'imgs/bc/logomark_w.svg').css('width', 30);
    }
  });
});



//トップページ　メインビジュアル　背景文字
document.querySelectorAll('.mv-text').forEach((elm) => {
  const split = elm.innerText.split('');
  let html = '';
  for (let i = 0; i < split.length; ++i) {
    html = html + '<span class="back-text__item">' + split[i] + '</span>';
  }
  elm.innerHTML = html;
});

setTimeout(() => {
  document.querySelectorAll('.back-text__item').forEach((elm, index) => {
    setTimeout(() => {
      elm.style.opacity = 1;
    }, 60 * index);
  });
}, 1500)


// トップページ　メインビジュアル縦書き
document.querySelectorAll('.vertical__item').forEach((elm) => {
  const split = elm.innerText.split('');
  let html = '';
  for (let i = 0; i < split.length; ++i) {
    html = html + '<span class="vertical__span">' + split[i] + '</span>';
  }
  elm.innerHTML = html;
});

setTimeout(() => {
  document.querySelectorAll('.vertical__span').forEach((elm, index) => {
    setTimeout(() => {
      elm.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    }, 60 * index);
  });
}, 3500)



// トップページworksのボックスをクリックするとworks.htmlにとぶ
$(function(){
  $('.works__box').click(function(){
    $(this).find('.works__inner').slideToggle();
    $(this).find('.works__inner').toggleClass("open");
  });

  if ($(".works") && location.hash) {
    const hashId = location.hash.split("#")[1];

    $(`.${hashId}`).slideToggle().toggleClass("open");

    if (window.matchMedia( "(min-width: 1025px)" ).matches) {
      $("html").animate({scrollTop: $($(`.${hashId}`)[1]).parent('.works__box').offset().top});
    } else {
      $("html").animate({scrollTop: $($(`.${hashId}`)[0]).parent('.works__box').offset().top});
    }
  }
});




//faq.html タブ
$('.faq__tab-btn').click(function() {
	var index = $('.faq__tab-btn').index(this);
	$('.faq__tab-btn, .faq__panel').removeClass('active');
	$(this).addClass('active');
	$('.faq__panel').eq(index).addClass('active');
});




//contact.html タブ
$('.contact__tab-btn').click(function() {
	var index = $('.contact__tab-btn').index(this);
	$('.contact__tab-btn, .contact__panel').removeClass('active');
	$(this).addClass('active');
	$('.contact__panel').eq(index).addClass('active');
});



// スクロールのドラッグ有効化
jQuery.prototype.mousedragscrollable = function () {
  let target;
  $(this).each(function (i, e) {
    $(e).mousedown(function (event) {
      event.preventDefault();
      target = $(e);
      $(e).data({
        down: true,
        move: false,
        x: event.clientX,
        y: event.clientY,
        scrollleft: $(e).scrollLeft(),
        scrolltop: $(e).scrollTop(),
      });
      return false;
    });
    $(e).click(function (event) {
      if ($(e).data("move")) {
        return false;
      }
    });
  });
  $(document)
    .mousemove(function (event) {
      if ($(target).data("down")) {
        event.preventDefault();
        let move_x = $(target).data("x") - event.clientX;
        let move_y = $(target).data("y") - event.clientY;
        if (move_x !== 0 || move_y !== 0) {
          $(target).data("move", true);
        } else {
          return;
        }
        $(target).scrollLeft($(target).data("scrollleft") + move_x);
        $(target).scrollTop($(target).data("scrolltop") + move_y);
        return false;
      }
    })
    .mouseup(function (event) {
      $(target).data("down", false);
      return false;
    });
};
$(".js-h-scroll").mousedragscrollable();








//slick.js
$('.slider').slick({
  autoplay: false,         
  dots: true, 
  arrows: false,          
  infinite: false, 
  pauseOnHover: false,
  slidesToShow: 1,
  variableWidth: true,
  initialSlide: 0,
  touchMove: true,
  draggable: true,
  swipeToSlide: true,
  swipe: true,
});

$(".slider").prepend($(".slider .slick-dots"));




