// Object
function Thumbnail(id, nam, desc, img){
  this.nam = nam;
  this.desc = desc;
  this.id = id;
  this.img = "img/"+img;
}

var vivre = new Thumbnail("viv","Vivre et Aimer", "A lifecoach made for you", "va_full.png");
var local = new Thumbnail("lwa","Local Weather Application", "This website describes the local weather.", "0");
var quotes = new Thumbnail("qt","Famous Quotes Generator", "This generates quotes from famous personalities ranging between past and present.", "0");
var thumbnailList = [vivre, local, quotes];


$(function() {
    var pull 		= $('#pull');
      menu 		= $('nav ul');
      menuHeight	= menu.height();

    $(pull).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle();
    });

    $(window).resize(function(){
          var w = $(window).width();
          if(w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');
          }
      });
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();
$(window).scroll(function(event){
  didScroll = true;
})

setInterval(function(){
  if (didScroll){
    hasScrolled();
    didScroll = false;
  }
},250)

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('nav').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('nav').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

$(document).ready(function(){

  contentLoader();
})


function contentLoader(){
  $('.thumbnail').click(function(){
    $this = $(this);
    thumbnailFinder($this);
    $('.full-port').css('left','-100%');
  });


};

function thumbnailFinder(thumb){
  var foundId = thumb.attr("id");
  var chosenThumb;
  thumbnailList.forEach(function(i){
    if(i.id===foundId){
      chosenThumb = i;
    }
  });
  portFiller(chosenThumb);
      // .addClass('thumb-title');
}

function portFiller(thumb){
  $('.thumb-title').text(thumb.nam);
  $('.port-details').append("<img src='"+thumb.img+"' class='port-img'/>")
  $('.port-details').append("<p class='port-desc'>"+thumb.desc+"</p>");
}
