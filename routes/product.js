/**
 * Created by 于小懒 on 10/25/15.
 */

"use strict";

var express = require('express');
var model = require('../models/productModel.js');
var router = express.Router();

/**
 * create
 * usage:
 * curl -X POST "http://localhost:8080/product" \
 *      -H "Content-Type:application/json" \
 *      --data  '{"name": "","desc": "",.....}'
 */
router.post('/', function (req, res) {

    var result = new JsonResult();

    if (req.body == null || req.body == {}) {
        result.setError(Errors.REQ_PARAM_NULL);
        res.json(result);
        return;
    }

    model.save(req.body, function (err, doc) {

        if (err != null) {
            result.setError(Errors.DB_SAVE_FAILED);
        } else {
            result.success = (err == null);
            result.data = doc;
        }

        res.json(result);
    })
});

/**
 * get model by name
 * usage:
 *      curl -X GET "http://localhost:8080/product/name/gravimetric" \
 *      -H "Content-Type:application/json"
 */
router.get('/name/:name', function (req, res) {

    var result = new JsonResult();

    var name = req.params.name;
    if (name == null || name == undefined) {
        result.setError(Errors.REQ_PARAM_NULL);
        res.json(result);
        return;
    }

    model.findOne({name: name}, function (err, doc) {

        if (err != null) {
            result.setError(Errors.DB_PARAM_ERR);
        } else {
            result.success = (err == null);
            result.data = doc;
        }

        res.json(result);
    });
});

/**
 * get model by _id
 * usage:
 *      curl -X GET "http://localhost:8080/product/id/56343c2a5f9be81b066d8a58" \
 *      -H "Content-Type:application/json"
 */
router.get('/id/:id', function (req, res) {

    var result = new JsonResult();

    var id = req.params.id;
    if (id == null || id == undefined) {
        result.setError(Errors.DB_PARAM_ERR);
        res.json(result);
        return;
    }

    model.findOne({_id: id}, function (err, doc) {

        var result = new JsonResult();

        if (err != null) {
            result.setError(Errors.DB_SAVE_FAILED);
        } else {
            result.success = (err == null);
            result.data = doc;
        }

        res.json(result);
    });
});

/**
 * update model(--data should have _id field to identify the model)
 * usage:
 *      curl -X PUT http://localhost:8080/product/56343ce7bccf8c3f06280ade \
 *      -H "Content-Type:application/json"
 *      --data  '{"_id":id, "name": "","desc": "",.....}'
 */
router.put('/', function (req, res) {

    var result = new JsonResult();

    var jsonObject = req.body;

    if (jsonObject == null || jsonObject == {}) {
        result.setError(Errors.DB_PARAM_ERR);
        res.json(result);
        return;
    }

    model.update(jsonObject, function (err, doc) {

        if (err != null) {
            result.setError(Errors.DB_SAVE_FAILED);
        } else {
            result.success = (err == null);
            result.data = doc;
        }

        res.json(result);
    })
});


/**
 * delete by id
 * usage:
 *      curl -X DELETE "http://localhost:8080/product/id/56343c2a5f9be81b066d8a58" \
 *      -H "Content-Type:application/json"
 */
router.delete('/:id', function (req, res) {

    var result = new JsonResult();

    var id = req.params.id;

    if (id == null) {
        result.setError(Errors.DB_PARAM_ERR);
        res.json(result);
        return;
    }

    model.remove({_id: id}, function (err, doc) {

        if (err != null) {
            result.setError(Errors.DB_SAVE_FAILED);
        } else {
            result.success = (err == null);
            result.data = doc;
        }

        res.json(result);
    });
});

module.exports = router;
