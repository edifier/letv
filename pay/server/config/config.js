var path = require('path');

//线上服务器地址(目前就知道这三台)
var proxy_sever = ['http://123.125.89.234:80/','http://123.126.32.242:80/','http://123.125.89.233:80/'];

module.exports = {
    host: '127.0.0.1',
    port: 80,   //服务器默认监听端口
    servers: [
        {
            name: 'js.letvcdn.com',
            root: 'E:/static',
            //proxy_pass: 'http://10.154.250.38:9998/',
            proxy_pass: proxy_sever[Math.floor(Math.random() * proxy_sever.length)],
            rewrite: function (filename, req) {
                var reg = /\/[a-zA-Z0-9]+_?pay\/.+\/(.+\.js)$/;
                if (reg.test(filename)) {
                    var name = RegExp.$1;
                    if(/.+_rjs\.js/.test(name)){
                        return filename.replace(reg, '/pay/src/rjs/' + name);
                    }else{
                        return filename.replace(reg, '/pay/src/js/' + name);
                    }
                }
                return filename;
            }
        },
        {
            name: 'css.letvcdn.com',
            root: 'E:/static',
            proxy_pass: 'http://10.154.250.38:9998/',
            rewrite: function (filename, req) {
                var reg = /\/[a-zA-Z0-9]+_?pay\/.+\/(.+\.css)$/;
                if (reg.test(filename)) {
                    return filename.replace(reg, '/pay/src/css/' + RegExp.$1);
                }
                return filename;
            }
        },
        {
            name: 't.letv.com',
            root: 'E:/',
            proxy_pass: 'http://10.154.250.38:9998/'
        }
    ],
    proxy_conf:{
        '2001': {
            'js.letvcdn.com': [
                {
                    regexp: /.+/,
                    transfer: function () {
                        return {
                            host: this.host,
                            port: this.port
                        };
                    }
                }
            ],
            'css.letvcdn.com': [
                {
                    regexp: /.+/,
                    transfer: function () {
                        return {
                            host: this.host,
                            port: this.port
                        };
                    }
                }
            ]
        }
    }
};
