let MonsterInstance = require('../models/MonsterInstance')

exports.elemnt_list = function(req, res, next) {
    res.render('index', { title: "monsterinstance list tests" });
};

exports.elemnt_detail = function(req, res, next) {
    res.render('index', { title: "monsterinstance detail tests" });
};

exports.elemnt_create_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance create tests" });
};

exports.elemnt_create_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance create post tests" });
};

exports.elemnt_delete_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete tests" });
};

exports.elemnt_delete_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete post tests" });
};

exports.elemnt_update_get = function(req, res, next) {
    res.render('index', { title: "monsterinstance update tests" });
};

exports.elemnt_update_post = function(req, res, next) {
    res.render('index', { title: "monsterinstance delete post tests" });
};