// youtube-looper
var video_id = '';
var start_seconds = 0;
var end_seconds = 0;
var elem = new Object();
var elm_youtube_video_url_error = new Object();
var elem_youtube_video_start = new Object();
var elem_youtube_video_end = new Object();
var elm_youtube_video_start_error = new Object();
var elm_youtube_video_end_error = new Object();
var elm_youtube_video_url_error = new Object();
var play_flg = false;
var is_playing = false;
var playback_rate = 1.0;
var duration = 0.0;

document.addEventListener("DOMContentLoaded", function() {
    elem = document.getElementById("youtube-player");
    // console.log(typeof (elem)); //Object
    elem_youtube_video_start = document.getElementById("youtube-video-start");
    elem_youtube_video_end = document.getElementById("youtube-video-end");
    elm_youtube_video_url_error = document.getElementById("youtube-video-url-error");
    elm_youtube_video_start_error = document.getElementById("youtube-video-start-error");
    elm_youtube_video_end_error = document.getElementById("youtube-video-end-error");
});

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    //generateYoutbePlayerに移動します
}

function generateYoutubePlayer(video_id, start_seconds, end_seconds) {
    elem.classList.remove("export-area");
    var playerConfig = {
        height: '480',
        width: '860',
        videoId: video_id,
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            // loop: 1,
            controls: 1, // Show pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            fs: 1, // Hide the full screen button
            cc_load_policy: 0, // Hide closed captions
            iv_load_policy: 3, // Hide the Video Annotations
            start: start_seconds,
            end: end_seconds,
            autohide: 0, // Hide video controls when playing
            playsinline: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    };
    player = new YT.Player('youtube-player', playerConfig);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    is_playing = true;
    // checkTime();
    duration = player.getDuration();
    console.log(duration); // ok
    // start_seconds = 0;
    elem_youtube_video_start.value = '0000';
    // end_seconds = player.getDuration();
    elem_youtube_video_end.value = parse_min_sec(Math.floor(duration));
}

function parse_min_sec(sec_or) {
    console.log('parse_min_sec');
    var hour = Math.floor(sec_or / (60 * 60));
    console.log(hour);
    var sec_tmp = sec_or - hour * 60 * 60;
    var min = Math.floor(sec_tmp / 60);
    sec_tmp = sec_tmp - min * 60;
    var sec = sec_tmp;
    var str = '';
    if (hour >= 1) {
        str += hour;
    }
    str = zeroPadding(min, 2) + zeroPadding(sec, 2);
    return str;
}

function zeroPadding(num, len) {
    return (Array(len).join('0') + num).slice(-len);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(start_seconds, true);
        // player.loadVideoById({
        //     videoId: video_id,
        //     startSeconds: start_seconds,
        //     endSeconds: end_seconds
        // });
    } else if (event.data == YT.PlayerState.PLAYING) {
        is_playing = true;
    } else if (event.data == YT.PlayerState.PAUSED) {
        is_playing = false;
    } else if (event.data == YT.PlayerState.BUFFERING) {} else if (event.data == YT.PlayerState.CUED) {}
}

function stopVideo() {
    player.stopVideo();
}

// 1001 10m1s
function strToSeconds(str) {
    var length = str.length;
    if (length == 5) {
        var hour = parseInt(str.substr(0, 1));
        var min = parseInt(str.substr(1, 2));
        var sec = parseInt(str.substr(4, 2));
        return hour * 60 * 60 + min * 60 + sec;
    } else if (length == 4) {
        console.log("error");
        var min = parseInt(str.substr(0, 2));
        console.log(min);
        var sec = parseInt(str.substr(2, 2));
        console.log(sec);
        return min * 60 + sec;
    } else if (length == 3) {
        var min = parseInt(str.substr(0, 1));
        var sec = parseInt(str.substr(2, 2));
        return min * 60 + sec;
    } else if (length == 2) {
        var sec = parseInt(str);
        return sec;
    } else if (length == 1) {
        var sec = parseInt(str);
        return sec;
    }
}

function setVideo() {
    console.log('setVideo()');
    video_id = getVideoId();
    if (video_id == null) {
        elm_youtube_video_url_error.style.display = "block"
        // elm_youtube_video_start_error.innerHTML = "入力されていません"
    } else {
        elm_youtube_video_url_error.style.display = "none"
    }
    generateYoutubePlayer(video_id);
}

function setStart() {
    // start_seconds = Math.floor(player.getCurrentTime());
    start_seconds = player.getCurrentTime();
    console.log(start_seconds);
    elem_youtube_video_start.value = parse_min_sec(Math.floor(start_seconds));
}

function setEnd() {
    // start_seconds = Math.floor(player.getCurrentTime());
    end_seconds = player.getCurrentTime();
    console.log(end_seconds);
    elem_youtube_video_end.value = parse_min_sec(Math.floor(end_seconds));
    changePlayer(start_seconds, end_seconds);
}

function changePlayer(start_seconds, end_seconds) {
    player.loadVideoById({
        videoId: video_id,
        startSeconds: start_seconds,
        endSeconds: end_seconds
    });
    // player.PlayVideo();
}

function run() {
    console.log('run()');
    var error_flg = false;
    if (video_id == null) {
        error_flg = true;
    }
    elem_youtube_video_start = document.getElementById("youtube-video-start");
    elem_youtube_video_end = document.getElementById("youtube-video-end");
    // console.log(video_id);
    var str_youtube_video_start = elem_youtube_video_start.value;
    // console.log(str_youtube_video_start);
    if (str_youtube_video_start == '') {
        elm_youtube_video_start_error.style.display = "block"
        elm_youtube_video_start_error.innerHTML = "https://youtu.be/9jmhfXrOF68 二人だけの初めてをもっと"
        error_flg = true;
    } else {
        elm_youtube_video_start_error.style.display = "none"
    }
    var str_youtube_video_end = elem_youtube_video_end.value;
    // console.log(str_youtube_video_end);
    if (str_youtube_video_end == '') {
        elm_youtube_video_end_error.style.display = "block"
        elm_youtube_video_end_error.innerHTML = "https://youtu.be/d2QRE-X9hGY ダンデライオンに恋を"
        error_flg = true;
    } else {
        elm_youtube_video_end_error.style.display = "none"
    }

    if (error_flg) return;

    start_seconds = strToSeconds(str_youtube_video_start);
    end_seconds = strToSeconds(str_youtube_video_end);
    play_flg = true;
    // video_id = 'SVZhx-woT_g';
    // generateYoutubePlayer(video_id, start_seconds, end_seconds);
    // player.startSeconds = 10;
    // player.endSeconds = 15;
    changePlayer(start_seconds, end_seconds);
    // player.playVideo();
}

function checkTime() {
    // while(true){
    //     console.log('testabc');
    //     if(player.getCurrentTime() >= end_seconds){
    //         player.seekTo(start_seconds);
    //     }
    //     if(!is_playing){
    //         break;
    //     }
    // }
}

function getVideoId() {
    var video_url = document.getElementById("youtube-video-url").value;
    var video_url_array = [];
    if (video_url.match(/watch\?v=/)) {
        console.log("1");
        video_url_array = video_url.split("watch?v=");
        return video_url_array[1].split("&")[0];
        //video_id = video_url_array[1].split("&feature=")[0];
        //video_id = video_id.split("&t")[0];
        //video_id = video_url_array[0];
        //videoLoad();
    } else if (video_url.match(/youtu.be/)) {
        console.log("2");
        video_url_array = video_url.split("/");
        return video_url_array[video_url_array.length - 1];
        //videoLoad();
    } else if (video_url == '') {
        console.log("3");
        var str = '<p class="default">ここに動画が表示されます</p>';
        elem.innerHTML = str;
        elm_youtube_video_url_error.innerHTML = '溶けそうに甘いよ https://youtu.be/XeabyV6wqUU';
        return null;
    } else {
        console.log("4");
        elm_youtube_video_url_error.innerHTML = '<p class="error">甘シュワな恋心に溺れてみたい<br>微炭酸マリンブルー<br>https://youtu.be/FTfBe9NPzyU</p>'; //改行禁止
        var str = '<p class="default">ここにサネイルの画像が表示されます</p>';
        elem.innerHTML = str;
        return null;
    }
}

function videoLoad() {
    /*
    //player.cueVideoById({videoId: video_id});
    player.cueVideoById({
    'videoId': 'hXSb5HhwGWg',
    'suggestedQuality': 'small'
    });
    */
    //elem.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video_id +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

function scrollToElem(id) {
    document.getElementById(id).scrollIntoView(true);
    /*
    var element = document.getElementById(id);
    var rect = element.getBoundingClientRect();
    var position = rect.top;
    scrollTo(0, position);
    */
}

function setSpeed(rate) {
    playback_rate = rate;
    player.setPlaybackRate(rate);
    if (rate === 0.2 && elm_mute_checkbox.checked) {
        player.mute();
    } else if (rate !== 0.2 && player.isMuted()) {
        player.unMute();
    }
}

function seek(sec) {
    var current_time = player.getCurrentTime();
    new_time = current_time + sec;
    if (new_time < 0)
        new_time = 0;
    else if (new_time > duration)
        new_time = duration;
    player.seekTo(new_time);
}