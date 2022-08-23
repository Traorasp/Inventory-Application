let Habitat = require('../models/Habitat')
let Monster = require('../models/Monster')

let async = require('async');
const { body, validationResult } = require('express-validator');

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
    res.render('habitat_create', { title: "Create Habitat" });
};

exports.habitat_create_post = [
    body('name', 'Name must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters."), 
    body('description', "Description must not be empty")
        .trim()
        .isLength({min:1})
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('habitat_create', { title: "Create Habitat", habitat: req.body, errors: errors.array() 
        });
        return;
        }
        const habitat = new Habitat({
            Name: req.body.name,
            Description: req.body.description,
        });

        habitat.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(habitat.url);
        })
    },
]

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