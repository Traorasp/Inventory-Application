let Element = require('../models/Element');
let Monster = require('../models/Monster');

let async = require('async');

exports.element_list = function(req, res, next) {
    Element.find().sort({'Name' : 1})
    .exec(function(err, list_elements) {
        if(err) {return next(err);}
        res.render('element_list', { title: "Element List", element_list: list_elements});
    })
};

exports.element_detail = function(req, res, next) {
    async.parallel({
            element(callback) {
                Element.findById(req.params.id)
                .populate('Weakness Strengths')
                .exec(callback)
            },
            element_monsters(callback) {
                Monster.find({'Element' : req.params.id}, 'Name Description')
                .exec(callback)
            },
    }, function(err, results) {
        if(err) {return next(err);}
        if(results.element == null) {
            let err = new Error('Element not found');
            err.status = 404;
            return next(err);
        }
        res.render('element_detail', { title: "Element Details", element: results.element, element_monsters: results.element_monsters});
    }) 
};

exports.element_create_get = function(req, res, next) {
    res.render('index', { title: "element create tests" });
};

exports.element_create_post = function(req, res, next) {
    res.render('index', { title: "element create post tests" });
};

exports.element_delete_get = function(req, res, next) {
    res.render('index', { title: "element delete tests" });
};

exports.element_delete_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};

exports.element_update_get = function(req, res, next) {
    res.render('index', { title: "element update tests" });
};

exports.element_update_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};