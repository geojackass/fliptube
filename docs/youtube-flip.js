$(function() {
    $("input,#input").change(function() {
        y_flip();
    });
    $("input,#input").keyup(function() {
        y_flip();
    });

    y_flip();
});

function y_flip() {

    var input_txt = $("#url").val();
//    var input_txt = $("youtube-video-url").val();
    var output_txt = input_txt;


    var mat = '';
    mat = input_txt.match(/[\/?=]([a-zA-Z0-9_\-]{11})[&\?]?/);
    if (!mat[1]) {
        console.log("null");
    } else {
        var id = mat[1];
        console.log(id);

        var y_iframe = $('<iframe width="860" height="480" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        $('#log').empty().append(y_iframe);
    }
};

function html(a, b, c) {

    var img = $('<img src="http://img.youtube.com/vi/' + b + '/' + a + '.jpg">');

    $('#_' + a + ' div').empty().append(img);
    $('#_' + a + ' input').val('http://img.youtube.com/vi/' + b + '/' + a + '.jpg');


    img.load(function() {
        w = img.width();
        // console.log(w);
        if (c != 120 && w <= 120) {
            // console.log("ng");
            $('#_' + a + ' input').val('このサイズのサムネイルはありません');
        } else if (c == 1280 && w != 120) {
            var img0 = new Image();
            img0.src = 'http://img.youtube.com/vi/' + b + '/maxresdefault.jpg';
            var width = img0.width;
            var height = img0.height;
            // console.log(width);
            $('#_maxresdefault p').text(width + ' × ' + height);
        }
    });
}