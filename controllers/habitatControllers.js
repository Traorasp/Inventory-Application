let Habitat = require('../models/Habitat')

exports.habitat_list = function(req, res, next) {
    res.render('index', { title: "habita list tests" });
};

exports.habitat_detail = function(req, res, next) {
    res.render('index', { title: "habita detail tests" });
};

exports.habitat_create_get = function(req, res, next) {
    res.render('index', { title: "habita create tests" });
};

exports.habitat_create_post = function(req, res, next) {
    res.render('index', { title: "habita create post tests" });
};

exports.habitat_delete_get = function(req, res, next) {
    res.render('index', { title: "habita delete tests" });
};

exports.habitat_delete_post = function(req, res, next) {
    res.render('index', { title: "habita delete post tests" });
};

exports.habitat_update_get = function(req, res, next) {
    res.render('index', { title: "habita update tests" });
};

exports.habitat_update_post = function(req, res, next) {
    res.render('index', { title: "habita delete post tests" });
};