let width = $(window).width();
let height = $(window).height();
var kv = document.getElementById("kv");
let a = 0;

setInterval(() => {
    kv.currentTime = 0;
    kv.play();
    kv.ontimeupdate = function() {kvFunction()};
}, 24000);

kv.ontimeupdate = function() {kvFunction()};

function kvFunction() {
    if ( kv.currentTime > 1.5 && kv.currentTime < kv.duration ){
        $('.title').fadeIn()
    } else {
        $('.title').hide()
    }
};

function kvHeight(width, height) {
    if ( width > 576 ) {
        $('.opening').height(height - 125);
    } else {
        $('.opening').height(height - 159);
    }
}
kvHeight(width, height);

$('.hamburger').on('click', function() {
    $('body, nav, .hamburger, main, .belt').toggleClass('opened');
})
$('nav li a').on('click', function() {
    $('body, nav, .hamburger, main, .belt').removeClass('opened');
})

$(window).on('resize', function() {
    let width = $(window).width();
    let height = $(window).height();
    kvHeight(width, height);
});
