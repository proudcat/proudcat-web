/**
 * Created by 于小懒 on 10/24/15.
 */

"use strict";

var conf = require('../config/db.json');
var mongoose = require('mongoose');

var close = function () {
    if (mongoose.connection) {
        mongoose.connection.close();
    }
};

module.exports = {

    /**
     * 连接数据库
     */
    connect: function (cb) {

        if (!conf) {
            console.error("connect to db failed: read db.json file error");
        }

        mongoose.connect(conf.uri);

        mongoose.connection.on('error', function () {
            //console.error.bind(console, 'connection error!');
            console.error('connection error!');
        });
        mongoose.connection.on('close', function () {
            //console.error.bind(console, 'connection closed!');
            console.warn('connection closed!');
        });

        mongoose.connection.once('open', function () {
            //console.log.bind(console, 'database connected successfully!');
            console.log('database connected successfully!');
            cb();
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            close();
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },

    close: function () {
        close();
    }
};