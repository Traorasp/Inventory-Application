const Monster = require('../models/Monster');
const MonsterInstance = require('../models/MonsterInstance');
const Element = require('../models/Element');
const Habitat = require('../models/Habitat');

let async = require('async');
const { body, validationResult } = require('express-validator');

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
    async.parallel({
        habitat(callback) {
            Habitat.find().sort({"Name": 1})
            .exec(callback)
        },
        element(callback) {
            Element.find().sort({"Name":1})
            .exec(callback)
        },
    }, function(err, results) {
        if(err) {return next(err);}
        res.render('monster_create', {title: "Create Monster", habitats: results.habitat, elements: results.element})
    }
    )
};

exports.monster_create_post = [
    (req, res, next) => {
        if(!Array.isArray(req.body.habitats)) {
            req.body.habitats = typeof req.body.habitats === "undefined" ? [] : [req.body.habitats];
        }
        if(!Array.isArray(req.body.elements)) {
            req.body.elements = typeof req.body.elements === "undefined" ? [] : [req.body.elements];
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
    body('price', "Price must not be empty")
        .isFloat({ min: 1}, "Price must atleast be 1")
        .escape(),
    body('habitats.*').escape(),
    body('elements.*').escape(),

    (req,res,next) => {
        const errors= validationResult(req);

        const monster = new Monster({
            Name: req.body.name,
            Price: req.body.price,
            Habitat: req.body.habitats,
            Element: req.body.elements,
            Description: req.body.description,
        })

        if(!errors.isEmpty()) {
            async.parallel({
                habitat(callback) {
                    Habitat.find().sort({"Name": 1})
                    .exec(callback)
                },
                element(callback) {
                    Element.find().sort({"Name":1})
                    .exec(callback)
                },
            }, function(err, results) {
                if(err) {return next(err);}
                for (const habitat of results.habitat) {
                    if(monster.Habitat.includes(habitat._id))
                        habitat.habitatCheck = "true;"
                };
                for (const element of results.element) {
                    if(monster.Element.includes(element._id))
                        element.elementCheck = "true;"
                };
                res.render('monster_create', {title: "Create Monster", monster, habitats: results.habitat, elements: results.element, errors: errors.array()})
            }
            );
            return;
        }

        monster.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect(monster.url);
        })
    }
]

exports.monster_delete_get = function(req, res, next) {
    async.parallel({
        monster(callback) {
            Monster.findById(req.params.id)
            .exec(callback)
        },
        monsterInstances(callback) {
            MonsterInstance.find({'Species' : req.params.id})
            .exec(callback)
        },
    }, 
    function(err, results) {
        if(err) {return next(err);}
        res.render('monster_delete', { 
            title: "Delete " + results.monster.Name, 
            monsterInstances: results.monsterInstances, 
            monster: results.monster
        });
})};

exports.monster_delete_post = function(req, res, next) {
    async.parallel({
        monster(callback) {
            Monster.findById(req.params.id)
            .exec(callback)
        },
        monsterInstances(callback) {
            MonsterInstance.find({'Species' : req.params.id})
            .exec(callback)
        },
    }, 
    function(err, results) {
        if(err) {return next(err);}
        if(results.monsterInstances.length > 0) {
            res.render('monster_delete', { 
                title: "Delete " + results.monster.Name, 
                monsterInstances: results.monsterInstances, 
                monster: results.monster
            });
            return;
        }
        Monster.findByIdAndRemove(req.body.monsterid, (err) => {
            if(err) {
                return next(err);
            }
            res.redirect("/catalog/monsters");
        })
})};

exports.monster_update_get = function(req, res, next) {
    async.parallel({
        monster(callback) {
            Monster.findById(req.params.id)
            .exec(callback)
        },
        habitat(callback) {
            Habitat.find().sort({"Name": 1})
            .exec(callback)
        },
        element(callback) {
            Element.find().sort({"Name":1})
            .exec(callback)
        },
    }, function(err, results) {
        if(err) {return next(err);}
        for (const habitat of results.habitat) {
            if(results.monster.Habitat.includes(habitat._id))
                habitat.habitatCheck = "true;"
        };
        for (const element of results.element) {
            if(results.monster.Element.includes(element._id))
                element.elementCheck = "true;"
        };
        res.render('monster_create', {title: "Update Monster", monster: results.monster, habitats: results.habitat, elements: results.element})
    })
};

exports.monster_update_post = [
    (req, res, next) => {
        if(!Array.isArray(req.body.habitats)) {
            req.body.habitats = typeof req.body.habitats === "undefined" ? [] : [req.body.habitats];
        }
        if(!Array.isArray(req.body.elements)) {
            req.body.elements = typeof req.body.elements === "undefined" ? [] : [req.body.elements];
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
    body('price', "Price must not be empty")
        .isFloat({ min: 1}, "Price must atleast be 1")
        .escape(),
    body('habitats.*').escape(),
    body('elements.*').escape(),

    (req,res,next) => {
        const errors= validationResult(req);

        const monster = new Monster({
            Name: req.body.name,
            Price: req.body.price,
            Habitat: req.body.habitats,
            Element: req.body.elements,
            Description: req.body.description,
            _id: req.params.id,
        })

        if(!errors.isEmpty()) {
            async.parallel({
                monster(callback) {
                    Monster.findById(req.params.id)
                    .exec(callback)
                },
                habitat(callback) {
                    Habitat.find().sort({"Name": 1})
                    .exec(callback)
                },
                element(callback) {
                    Element.find().sort({"Name":1})
                    .exec(callback)
                },
            }, function(err, results) {
                if(err) {return next(err);}
                for (const habitat of results.habitat) {
                    if(monster.Habitat.includes(habitat._id))
                        habitat.habitatCheck = "true;"
                };
                for (const element of results.element) {
                    if(monster.Element.includes(element._id))
                        element.elementCheck = "true;"
                };
                res.render('monster_create', {title: "Update Monster", monster: results.Monster, habitats: results.habitat, elements: results.element, errors: errors.array()})
            }
            );
            return;
        }

        Monster.findByIdAndUpdate(req.params.id, monster,{}, (err, themonster) => {
            if(err) {
                return next(err);
            }
            res.redirect(themonster.url);
        })
    }
]