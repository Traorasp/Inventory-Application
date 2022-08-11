let Habitat = require('../models/Habitat')

exports.elemnt_list = function(req, res, next) {
    res.render('index', { title: "habita list tests" });
};

exports.elemnt_detail = function(req, res, next) {
    res.render('index', { title: "habita detail tests" });
};

exports.elemnt_create_get = function(req, res, next) {
    res.render('index', { title: "habita create tests" });
};

exports.elemnt_create_post = function(req, res, next) {
    res.render('index', { title: "habita create post tests" });
};

exports.elemnt_delete_get = function(req, res, next) {
    res.render('index', { title: "habita delete tests" });
};

exports.elemnt_delete_post = function(req, res, next) {
    res.render('index', { title: "habita delete post tests" });
};

exports.elemnt_update_get = function(req, res, next) {
    res.render('index', { title: "habita update tests" });
};

exports.elemnt_update_post = function(req, res, next) {
    res.render('index', { title: "habita delete post tests" });
};