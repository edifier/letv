//使用jquery
var jQuery = require('../core/base/jquery-1.7.1.js');
var jsonToQuery = require('../core/base/json/jsonToQuery.js');
var queryToJson = require('../core/base/json/queryToJson.js');

var jsonToStr = require('../core/base/json/jsonToStr.js');
var strToJson = require('../core/base/json/strToJson.js');

//这里的引用用来做测试
var URL = require('../core/base/util/URL.js');

(function ($) {

    $('body').ready(function () {
        $('#testBtn').click(function () {
            try {
                var o = strToJson($('#textarea').val());
                $('#textarea').val(jsonToQuery(o));
            } catch (e) {
                console.log(e);
                alert('this is not a object');
            }
        });

        $('#reset').click(function () {
            var o = $('#textarea').val();
            $('#textarea').val(jsonToStr(queryToJson(o)));
        });
    });

    //测试log
    console.log(URL('http://abc.com/a/b/c.php?a=1&b=2#a=1').setParam('a', 'abc').setHash('a', 67889).setHash('a1', 444444).valueOf());

})(jQuery);
