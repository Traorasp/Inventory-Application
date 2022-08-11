let Element = require('../models/Element')

exports.elemnt_list = function(req, res, next) {
    res.render('index', { title: "element list tests" });
};

exports.elemnt_detail = function(req, res, next) {
    res.render('index', { title: "element detail tests" });
};

exports.elemnt_create_get = function(req, res, next) {
    res.render('index', { title: "element create tests" });
};

exports.elemnt_create_post = function(req, res, next) {
    res.render('index', { title: "element create post tests" });
};

exports.elemnt_delete_get = function(req, res, next) {
    res.render('index', { title: "element delete tests" });
};

exports.elemnt_delete_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};

exports.elemnt_update_get = function(req, res, next) {
    res.render('index', { title: "element update tests" });
};

exports.elemnt_update_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};