let MonsterInstance = require('../models/MonsterInstance')

exports.monsterinstance_list = function(req, res, next) {
    res.render('index', { title: "monsterinstance list tests" });
};

exports.monsterinstance_detail = function(req, res, next) {
    res.render('index', { title: "monsterinstance detail tests" });
};

exports.monsterinstance_create_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance create tests" });
};

exports.monsterinstance_create_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance create post tests" });
};

exports.monsterinstance_delete_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete tests" });
};

exports.monsterinstance_delete_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete post tests" });
};

exports.monsterinstance_update_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance update tests" });
};

exports.monsterinstance_update_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete post tests" });
};