let Habitat = require('../models/Habitat')

exports.habitat_list = function(req, res, next) {
    res.render('index', { title: "habitat list tests" });
};

exports.habitat_detail = function(req, res, next) {
    res.render('index', { title: "habitat detail tests" });
};

exports.habitat_create_get = function(req, res, next) {
    res.render('index', { title: "habitat create tests" });
};

exports.habitat_create_post = function(req, res, next) {
    res.render('index', { title: "habitat create post tests" });
};

exports.habitat_delete_get = function(req, res, next) {
    res.render('index', { title: "habitat delete tests" });
};

exports.habitat_delete_post = function(req, res, next) {
    res.render('index', { title: "habitat delete post tests" });
};

exports.habitat_update_get = function(req, res, next) {
    res.render('index', { title: "habitat update tests" });
};

exports.habitat_update_post = function(req, res, next) {
    res.render('index', { title: "habitat delete post tests" });
};