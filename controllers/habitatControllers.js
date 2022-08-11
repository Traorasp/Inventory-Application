let Habitat = require('../models/Habitat')
let Monster = require('../models/Monster')

let async = require('async')

exports.habitat_list = function(req, res, next) {
    Habitat.find().sort({'Name' : 1})
    .exec(function(err, list_habitats) {
        if(err) {return next(err);}
        res.render('habitat_list', { title: "Habitat List", habitat_list: list_habitats});
    })
};

exports.habitat_detail = function(req, res, next) {
    async.parallel({
        habitat(callback) {
            Habitat.findById(req.params.id)
            .exec(callback)
        },
        habitat_monsters(callback) {
            Monster.find({'Habitat' : req.params.id}, 'Name Description')
            .exec(callback)
        },
    }, function(err, results) {
        if(err) {return next(err);}
        if(results.habitat == null) {
            let err = new Error('Habitat not found');
            err.status = 404;
            return next(err);
        }
        res.render('habitat_detail', { title: "Habitat Details", habitat: results.habitat, habitat_monsters: results.habitat_monsters});
    })
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