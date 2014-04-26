//jQuery(document).ready(function ($) {
//    $('.color-picker').iris({
//        width: 300,
//        hide: true
//    });
//});

$(document).on("ready", function () {
    $('.color-picker').spectrum({
        allowEmpty: true,
        preferredFormat: "hex6",
        showInput: true
    }).show();
});