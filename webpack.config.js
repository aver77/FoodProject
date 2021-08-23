'use strict'

let path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/script.js',
    output: {
        filename: '../dist/bundle.js',
        path: __dirname + '/js' //__dirname - текущая папка
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/, //находим js файлы
                exclude: /(node_modules|bower_components)/, //исключаем их из выборки
                use: { //как и что используем
                    loader: 'babel-loader', // это используем
                    options: { //опции в нем
                        presets: [['@babel/preset-env', { //задаем пресет - набор настроек
                            debug: true, //полная информация о дебаге
                            corejs: 3, //подключение всех возможных полифилов
                            useBuiltIns: "usage" //из них выбираются только нужные
                        }]]
                    }
                }
            }
        ]
    }
};