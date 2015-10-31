/**
 * Created by 于小懒 on 10/28/15.
 * all global variables
 */

var product = {
    name: "",
    desc: "",
    price: 0,
    image: "",
    recently: false
};

/**
 * response data structure
 * @returns {{success: boolean, data: {}, errors: Array}}
 * @constructor
 */
var JsonResult = function () {
    return {
        "success": false,
        "data": {},
        "errors": []
    }
};

/**
 * 设置JsonResult错误信息
 * @param reason Errors的key
 */
JsonResult.prototype.setError = function (reason) {
    this.success = false;
    this.error.push(reason);
};

// error information
var Errors = {

    "UNKNOWN": {"code": 1000, "message": "unknown error!"},


    //route error
    "REQ_PARAM_NULL": {"code": 2001, "message": "request parameter is null!"},


    //db & model error
    "DB_PARAM_ERR": {"code": 3000, "message": "parameter is illegal!"},
    "DB_QUERY_ERR": {"code": 3001, "message": "query string is illegal!"},
    "DB_SAVE_FAILED": {"code": 3002, "message": "save model failed!"},
    "DB_UPDATE_FAILED": {"code": 3003, "message": "update model failed!"}
};


GLOBAL.JsonResult = JsonResult;
GLOBAL.Errors = Errors;