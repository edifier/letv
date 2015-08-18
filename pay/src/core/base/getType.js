/*
 * author wangxin8@letv.com
 * 获取对象类型 getType(function(){}) === 'function';
 */

function  getType(oObject) {
        var _t;
        return ((_t = typeof(oObject)) == "object" ? oObject == null && "null" || Object.prototype.toString.call(oObject).slice(8, -1) : _t).toLowerCase();
}

if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = getType;
}

