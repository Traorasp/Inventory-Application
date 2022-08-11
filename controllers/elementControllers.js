let Element = require('../models/Element')

exports.element_list = function(req, res, next) {
    res.render('index', { title: "element list tests" });
};

exports.element_detail = function(req, res, next) {
    res.render('index', { title: "element detail tests" });
};

exports.element_create_get = function(req, res, next) {
    res.render('index', { title: "element create tests" });
};

exports.element_create_post = function(req, res, next) {
    res.render('index', { title: "element create post tests" });
};

exports.element_delete_get = function(req, res, next) {
    res.render('index', { title: "element delete tests" });
};

exports.element_delete_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};

exports.element_update_get = function(req, res, next) {
    res.render('index', { title: "element update tests" });
};

exports.element_update_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};