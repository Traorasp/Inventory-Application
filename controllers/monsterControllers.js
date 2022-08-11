let Monster = require('../models/Monster')

exports.elemnt_list = function(req, res, next) {
    res.render('index', { title: "monster list tests" });
};

exports.elemnt_detail = function(req, res, next) {
    res.render('index', { title: "monster detail tests" });
};

exports.elemnt_create_get = function(req, res, next) {
    res.render('index', { title: "monster create tests" });
};

exports.elemnt_create_post = function(req, res, next) {
    res.render('index', { title: "monster create post tests" });
};

exports.elemnt_delete_get = function(req, res, next) {
    res.render('index', { title: "monster delete tests" });
};

exports.elemnt_delete_post = function(req, res, next) {
    res.render('index', { title: "monster delete post tests" });
};

exports.elemnt_update_get = function(req, res, next) {
    res.render('index', { title: "monster update tests" });
};

exports.elemnt_update_post = function(req, res, next) {
    res.render('index', { title: "monster delete post tests" });
};