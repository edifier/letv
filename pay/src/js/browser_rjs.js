//公共方法引入
var getType = require('../core/base/getType.js');
var jsonToQuery = require('../core/base/jsonToQuery.js');

if (getType(jQuery) != 'object') {
    var jQuery = require('../core/jquery-2.0.3.js');
}

(function ($) {

    //使用jquery
    $('body').ready(function () {

        $('#testBtn').click(function () {

            var o = eval('('+$('#textarea').val()+')');

            if (getType(o) != 'object') {
                alert('输入的不是对象');
                return false;
            }

            $('#textarea').val(jsonToQuery(o));
        });
    });

})(jQuery);
