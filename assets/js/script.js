let width = $(window).width();
let height = $(window).height();
var kv = document.getElementById("kv");

// KV Video Start
if( !(/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) ) {
    setInterval(() => {
        kv.currentTime = 0;
        kv.play();
        kv.ontimeupdate = function() {kvFunction()};
    }, 24000);
}

kv.ontimeupdate = function() {kvFunction()};

function kvFunction() {
    if ( kv.currentTime > 1.5 ){
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
    if ( height > width ) { // portrait
        $('.title-1').css({
            'margin-bottom': -(height-159)*0
        });
        $('.title-2').css({
            'margin-top': -(height-159)*0
        });
    } else {
        $('.title-1').css({
            'margin-top': -(height-125)*.01,
            'margin-right': (height-125)*.3
        });
        $('.title-1 img').css({
            'height': (height-125)*.408
        });
    }
}
kvHeight(width, height);

$(window).on('resize', function() {
    let width = $(window).width();
    let height = $(window).height();
    kvHeight(width, height);
});
// KV Video End

// hamburger Start
$('.hamburger').on('click', function() {
    $('body, nav, .hamburger, main, .belt').toggleClass('opened');
})
$('nav li a').on('click', function() {
    $('body, nav, .hamburger, main, .belt').removeClass('opened');
})
// hamburger End

// scroll and play youtube Start
var player;
var playerSatus;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api"; // Take the API address.
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Include the API inside the page.

/**
* Integration of onYouTubeIframeAPIReady() functtion.
* - Called while the video is first time loaded.
* - Also place the iframe embaded youtube video in the div with the id 'video'.
*/
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'jDu-lTPlmF8', // Providing the video ID.
        height: '284', // Video height.
        width: '486', // Video width.
        playerVars: {
            'playsinline': 1,
            'mute': 1
        },
        events: {
            'onReady': onPlayerReady, // Initializing the on load function.
            'onStateChange': onPlayerStateChange // Initializing the on change action function.
        }
    });
}

/**
* Integration of onPlayerReady() functtion.
* - Called while the video is loaded and let the video automatically play.
*/
function onPlayerReady(event) {
    event.target.playVideo(); // Here we are auto playing the video on loading the page.
}

/**
* Integration of onPlayerReady() functtion.
* - Called while pause/replay/stop the video.
*/
function onPlayerStateChange(event){
    playerSatus = event.data;
}

$('#pause').click( function(){
    // Checks for the video is playing or not.
    if (playerSatus == YT.PlayerState.PLAYING) {
        player.pauseVideo(); // 'player' variable we already defined and assigned.
    }
});
$('#play').click( function(){
    // Checks for the video is paused or not.
    if (playerSatus == YT.PlayerState.PAUSED) {
        player.playVideo();
    }
});

$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    let height = $(window).height();
    let videoScrollTop = $('#player').offset().top;
    let videoHeight = $('#player').height();
    if ( scroll > (videoScrollTop - height) && scroll < (videoScrollTop + videoHeight) ) {
        // console.log('play');
        $('#play').click();
    } else {
        // console.log('pause');
        $('#pause').click();
    }
});
// scroll and play youtube End
