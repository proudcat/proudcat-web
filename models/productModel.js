/**
 * Created by 于小懒 on 10/24/15.
 */
"use strict";

var mongoose = require('mongoose');

/**
 * 商品Schema
 */
var schema = new mongoose.Schema({

    /**
     * 名字
     */
    name: {type: String, index: true},

    /**
     * 图像地址
     */
    image: String,

    /**
     * 描述
     */
    desc: String,

    /**
     * 价格
     */
    price: {type: Number, min: 0, max: 1000},

    /**
     * 新品 true:新品 false:非新品
     */
    recently: Boolean

    //comments: [{
    //    user_id: String,
    //    message: String,
    //    date: {type: Date, default: Date.now}
    //}]
}, {collection: 'product'});

schema.methods.save2db = function () {
    var self = this;
    this.save(function (err) {
        if (err) {
            console.error("player: %s save2db error ", self._id.toString(), err);
        }
    });
};

var model = mongoose.model('product', schema);

//
//var Tank = mongoose.model('Tank', yourSchema);
//
//var small = new Tank({ size: 'small' });
//small.save(function (err) {
//    if (err) return handleError(err);
//    // saved!
//})
//
//// or
//
//Tank.create({ size: 'small' }, function (err, small) {
//    if (err) return handleError(err);
//    // saved!
//})

//var conditions = { name: 'borne' }
//    , update = { $set: { title: 'xxxxb' }}
//    , options = {};
//
//Blog.update({_id:'4f866f35311977a81b000001'},update,options,function(err,docs){
//    console.log(docs+","+err);
//});


/**
 * product model api
 */
module.exports = {

    remove: function (condition, cb) {
        model.remove(condition, function (err, doc) {
            cb(err, doc);
        })
    },

    /**
     *
     * @param conditions   { _id: 123 }
     * @param update    { $set: { fooCount: 118 }}
     * @param options { upsert: true ,multi:true}
     * @param cb
     */
    update: function (conditions, update, options, cb) {
        model.update(conditions, update, options, function () {
            cb();
        });

        //model.findOne(conditions, function (err, user) {
        //    user.Points += points;
        //    user.save(function (err) {
        //        if (err) {
        //            return next(err);
        //        }
        //    });
        //});
    },

    findOneAndUpdate: function (conditions, update, options, cb) {

    },

    /**
     * 新建model
     * @param json
     * @param cb
     */
    save: function (json, cb) {
        //var newProduct = new model(json);
        //newProduct.save(function (err, doc, numAffected) {
        //    cb(err,doc);
        //});

        model.create(json, function (err, doc) {
            cb(err, doc);
        });
    },


    /**
     * 查找某个model
     * @param condition { _id: xx,name:xxx}
     * @param cb
     */
    findOne: function (condition, cb) {
        model.findOne(condition, function (err, doc) {
            cb(err, doc.lean());
        });

    },

    /**
     * 查找全部model
     * TODO:分页机制
     * @param cb
     */
    find: function (cb) {
        model.find(function (err, docs) {
            cb(err, docs.lean());
        });
    }
};