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
    name: {type: String, index: true, required: true},

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
    recently: {type: Boolean, default: false}

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

    remove: function (id, cb) {
        var conditions = {_id: id};
        var options;
        model.findOneAndRemove(conditions, function (error, doc) {
            cb(error, doc);
        });

    },

    /**
     * update model
     * @param id
     * @param condition
     * @param cb
     */
    update: function (json, cb) {

        var options = {upsert: true, multi: false};

        model.findOneAndUpdate({_id: json._id}, json, options, function (err, doc) {
            cb(err, doc);
        });
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
            cb(err, doc);
        });
    },

    /**
     * 查找全部model
     * TODO:分页机制
     * @conditions
     * @param page
     *  {page:2,number:3}
     * @param cb
     */
    findAll: function (cb) {
        model.find({}).exec(function (err, docs) {
            cb(err, docs.lean());
        });
    }
};