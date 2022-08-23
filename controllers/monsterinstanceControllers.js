const MonsterInstance = require('../models/MonsterInstance')
const Monster = require('../models/Monster');

const { body, validationResult } = require('express-validator');

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
    Monster.find().sort({"Name": 1})
    .exec(function(err, monsters) {
        if(err) {return next(err);}
        res.render('monsterinstance_create', { title: "Create Monster instance", monsters});
    })
};

exports.monsterinstance_create_post = [
    (req, res, next) => {
        if(!Array.isArray(req.body.species)) {
            req.body.species = typeof req.body.species === "undefined" ? [] : [req.body.species]; 
        }
        next();
    },
    body("name", "Name must not be empty.")
        .trim()
        .isLength({min:1})
        .escape(),
    body('age', "Age must not be empty")
        .isFloat({ min: 0}, "Age must atleast be atleast 0")
        .escape(),
    body('species').escape(),

    (req,res,next) => {
        const errors = validationResult(req);

        const monsterInstance = new MonsterInstance({
            Name: req.body.name,
            Age: req.body.age,
            Species: req.body.species,
        })

        if(!errors.isEmpty()) {
            Monster.find().sort({"Name": 1})
            .exec(function(err, monsters) {
                if(err) {return next(err);}
                for(const monster in monsters) {
                    if(monsterInstance.Species === monster._id) {
                        monster.selected = "true";
                    }
                }
                res.render('monsterinstance_create', { title: "Create Monster instance", monsters, monsterInstance, errors: errors.array()});
            }
            );
            return;
        }

        monsterInstance.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect(monsterInstance.url);
        });
    },
];

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