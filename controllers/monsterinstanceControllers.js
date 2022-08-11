let MonsterInstance = require('../models/MonsterInstance')

exports.monsterinstance_list = function(req, res, next) {
    MonsterInstance.find()
    .sort({'Name' : 1})
    .populate('Species')
    .exec(function(err, list_monsterinstances) {
        if(err) {return next(err);}
        res.render('monsterinstance_list', { title: "Monster Instances List", monsterinstances_list: list_monsterinstances});
    })
};

exports.monsterinstance_detail = function(req, res, next) {
    MonsterInstance.findById(req.params.id)
    .populate('Species')
    .exec(function(err, monsterinstance) {
        if(err) {return next(err);}
        res.render('monsterinstance_detail', { title: "Monster Instance Details", monsterinstance: monsterinstance});
    })
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