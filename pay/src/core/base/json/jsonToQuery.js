/*
 * author wangxin8@letv.com
 * 将对象装换为字符串:jsonToQuery{a:1，b:2} == 'a=1&b=2';
 */

function  jsonToQuery(JSON, isEncode) {

    var _fdata = function (data, isEncode) {
        data = data == null ? '' : data;
        data = data.toString();
        if (isEncode) {
            return encodeURIComponent(data);
        } else {
            return data;
        }
    };

    var _Qstring = [];

    if (typeof JSON == "object") {
        for (var k in JSON) {
            if (k === '$nullName') {
                _Qstring = _Qstring.concat(JSON[k]);
                continue;
            }
            if (JSON[k] instanceof Array) {
                for (var i = 0, len = JSON[k].length; i < len; i++) {
                    _Qstring.push(k + "=" + _fdata(JSON[k][i], isEncode));
                }
            } else {
                if (typeof JSON[k] != 'function') {
                    _Qstring.push(k + "=" + _fdata(JSON[k], isEncode));
                }
            }
        }
    }

    if (_Qstring.length) {
        return _Qstring.join("&");
    } else {
        return "";
    }
};

if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = jsonToQuery;
}