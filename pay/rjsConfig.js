/**
 * author :wangxin8@letv.com
 * 查找某文件加下的所有rjs文件，返回路径对象
 */
'use strict';
var fs = require('fs');

module.exports = function (dn) {

    if (/(\.\/)?src/gi.test(dn) || dn === 'src') {
        var inputPath = dn;
    } else {
        var inputPath = 'src/' + dn;
    }

    var that = {};

    //输出的文件路径
    var transition_file = arguments[1] || './dest/';
    //var transition_file = 'src/js/';
    !fs.existsSync(transition_file) && fs.mkdirSync(transition_file);

    var i = 0, fileManipulation = function (fileName, baseDir, outputDir) {
        if (!that[outputDir + fileName]) {
            that[outputDir + fileName] = baseDir;
        } else {
            i += 1;
            console.warn('holy shit , duplicate file name : \n' + baseDir + '\n' + that[outputDir + fileName] + '\n');
            var newName = fileName.replace(/\.js/, '') + '_back_up_' + i + '.js';
            fileManipulation(newName, baseDir, outputDir);
        }
    };

    function walk(fileDir, outputDir) {
        var files = fs.readdirSync(fileDir);
        files.forEach(function (fileName, i) {
            var baseDir = fileDir + fileName, lstat = fs.lstatSync(baseDir);
            if (lstat.isDirectory()) {
                if (fileName === 'js') {
                    var files = fs.readdirSync(baseDir);
                    files.forEach(function (fileName, i) {
                        //对rjs文件的处理
                        if (/^.+_rjs\.js$/.test(fileName)) {
                            fileManipulation(fileName, baseDir + '/' + fileName, outputDir);
                        }
                    });
                } else if (fileName === 'rjs') {
                    var files = fs.readdirSync(baseDir);
                    files.forEach(function (fileName, i) {
                        //对rjs文件的处理
                        if (/^.+\.js$/.test(fileName)) {
                            fileManipulation(fileName, baseDir + '/' + fileName, outputDir);
                        }
                    });
                } else {
                    walk(baseDir + '/', outputDir);
                }
            } else if (lstat.isFile()) {
                //对rjs文件的处理
                if (/^.+_rjs\.js$/.test(fileName)) {
                    fileManipulation(fileName, baseDir, outputDir);
                }
            }
        });
    };

    walk(inputPath + '/', transition_file);

    return that;
};