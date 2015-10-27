/**
 * Created by koala on 10/25/15.
 */

var express = require('express');
var router = express.Router();
var model = require('../models/productModel.js');

/**
 * get all product
 */
router.get('/all', function (req, res, next) {
    res.json({result: 'respond with a resource'});
    var result = {
        "result": {},
        "success": false,
        "errors": [{"code": 1, "message": ""}],
        "messages": []
    };
});

router.get('/:name', function (req, res, next) {

    model.findOne({name: req.name}, function (err, doc) {

        var json = {
            "result": {},
            "success": true,
            "errors": {}
        };

        if (err) {
            json.success = false;
            json.errors = err;
            console.log('FATAL ' + err);
        } else {
            json.result = doc;
        }

        res.json(json);

    });

});

//router.create('/new');

module.exports = router;
