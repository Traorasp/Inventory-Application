let Monster = require('../models/Monster');
let MonsterInstance = require('../models/MonsterInstance');

let async = require('async');

exports.monster_list = function(req, res, next) {
    Monster.find().sort({'Name' : 1})
    .exec(function(err, list_monsters) {
        if(err) {return next(err);}
        res.render('monster_list', { title: "Monster List", monster_list: list_monsters});
    })
};

exports.monster_detail = function(req, res, next) {
    async.parallel({
        monster(callback) {
            Monster.findById(req.params.id)
            .populate('Habitat Element')
            .sort({'Name' : 1})
            .exec(callback)
        },
        monster_instances(callback) {
            MonsterInstance.find({'Species': req.params.id})
            .sort({'Name' : 1})
            .exec(callback)
        },
    }, function(err, results) {
        if(err) {return next(err);}
        if(results.monster == null) {
            let err = new Error('Monster not found');
            err.status = 404;
            return next(err);
        }
        res.render('monster_detail', { title: "Monster Details", monster: results.monster, monster_instances: results.monster_instances});
    })
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