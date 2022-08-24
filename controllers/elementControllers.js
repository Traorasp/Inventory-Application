let Element = require('../models/Element');
let Monster = require('../models/Monster');

let async = require('async');
const { validate } = require('../models/Element');

const { body, validationResult } = require("express-validator");

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
    Element.find().sort({'Name' : 1})
    .exec(function(err, list_elements) {
        if(err) {return next(err);}
        res.render('element_create', {title: "Create Element", elements: list_elements});
    })
};

exports.element_create_post = [
    (req, res, next) => {
    if(!Array.isArray(req.body.strengths)) {
        req.body.strengths = typeof req.body.strengths === "undefined"? [] : [req.body.strengths];
    }
    if(!Array.isArray(req.body.weakness)) {
        req.body.weakness = typeof req.body.weakness === "undefined"? [] : [req.body.weakness];
    }
    next();
    },
    body("name", "Name must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
    body('description', "Description must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
    body('weakness.*').escape(),
    body('strengths.*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
      
        const newElement = new Element({
            Name: req.body.name,
            Weakness: req.body.weakness,
            Strengths: req.body.strengths,
            Description: req.body.description
        });

        if(!errors.isEmpty()) {
            Element.find().sort({'Name' : 1})
            .exec(function(err, list_elements) {
                if(err) {return next(err);}

                for (const element of list_elements) {
                    if (newElement.weakness.includes(element._id)) {
                        element.weaknessCheck = "true";
                    }
                    if (newElement.strengths.includes(element._id)) {
                        element.strengthsCheck = "true";
                    }
                }

                res.render('element_create', {title: "Create Element", elements: list_elements, newElement, errors: errors.array()
                });
            });  
            return;
        }
        newElement.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(newElement.url)
        });
    },
];

exports.element_delete_get = function(req, res, next) {
    async.parallel({
        element(callback) {
            Element.findById(req.params.id)
            .exec(callback)
        },
        relatedElements(callback) {
            Element.find({"$or" : [{"Weakness" : req.params.id}, {"Strengths" : req.params.id}]})
            .exec(callback)
        },
        monsters(callback) {
            Monster.find({'Element' : req.params.id}, 'Name Description')
            .exec(callback)
        },
    }, 
    function(err, results) {
        if(err) {return next(err);}
        res.render('element_delete', { 
            title: "Delete " + results.element.Name, 
            element: results.element, 
            relatedElements: results.relatedElements, 
            monsters: results.monsters
        });
})
};

exports.element_delete_post = function(req, res, next) {
    async.parallel({
        element(callback) {
            Element.findById(req.params.id)
            .exec(callback)
        },
        relatedElements(callback) {
            Element.find({"$or" : [{"Weakness" : req.params.id}, {"Strengths" : req.params.id}]})
            .exec(callback)
        },
        monsters(callback) {
            Monster.find({"Element" : req.params.id})
            .exec(callback)
        },
    }, 
    function(err, results) {
        if(err) {return next(err);}

        if(results.monsters.length > 0 || results.relatedElements.length > 0) {
            res.render('element_delete', { 
                title: "Delete " + results.element.Name, 
                element: results.element, 
                relatedElements: results.relatedElements, 
                monsters: results.monsters
            });
            return;
        }
        Element.findByIdAndRemove(req.body.elementid, (err) => {
            if(err) {
                return next(err);
            }
            res.redirect("/catalog/elements");
        })
})};

exports.element_update_get = function(req, res, next) {
    res.render('index', { title: "element update tests" });
};

exports.element_update_post = function(req, res, next) {
    res.render('index', { title: "element delete post tests" });
};