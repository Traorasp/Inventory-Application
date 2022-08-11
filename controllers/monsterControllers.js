let Monster = require('../models/Monster')

exports.monster_list = function(req, res, next) {
    res.render('index', { title: "monster list tests" });
};

exports.monster_detail = function(req, res, next) {
    res.render('index', { title: "monster detail tests" });
};

exports.monster_create_get = function(req, res, next) {
    res.render('index', { title: "monster create tests" });
};

exports.monster_create_post = function(req, res, next) {
    res.render('index', { title: "monster create post tests" });
};

exports.monster_delete_get = function(req, res, next) {
    res.render('index', { title: "monster delete tests" });
};

exports.monster_delete_post = function(req, res, next) {
    res.render('index', { title: "monster delete post tests" });
};

exports.monster_update_get = function(req, res, next) {
    res.render('index', { title: "monster update tests" });
};

exports.monster_update_post = function(req, res, next) {
    res.render('index', { title: "monster delete post tests" });
};