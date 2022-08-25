var express = require('express');
var router = express.Router();

let elementControllers = require('../controllers/elementControllers')
let habitatControllers = require('../controllers/habitatControllers')
let monsterControllers = require('../controllers/monsterControllers')
let monsterinstanceControllers = require('../controllers/monsterinstanceControllers')

/* GET users listing. */
router.get('/', monsterControllers.index)


/// ELEMENT ROUTES ///

router.get('/element/create', elementControllers.element_create_get);

router.post('/element/create', elementControllers.element_create_post);

router.get('/element/:id/delete', elementControllers.element_delete_get);

router.post('/element/:id/delete', elementControllers.element_delete_post);

router.get('/element/:id/update', elementControllers.element_update_get);

router.post('/element/:id/update', elementControllers.element_update_post);

router.get('/element/:id', elementControllers.element_detail);

router.get('/elements', elementControllers.element_list);

/// HABITAT ROUTES ///

router.get('/habitat/create', habitatControllers.habitat_create_get);

router.post('/habitat/create', habitatControllers.habitat_create_post);

router.get('/habitat/:id/delete', habitatControllers.habitat_delete_get);

router.post('/habitat/:id/delete', habitatControllers.habitat_delete_post);

router.get('/habitat/:id/update', habitatControllers.habitat_update_get);

router.post('/habitat/:id/update', habitatControllers.habitat_update_post);

router.get('/habitat/:id', habitatControllers.habitat_detail);

router.get('/habitats', habitatControllers.habitat_list);

/// MONSTER ROUTES ///

router.get('/monster/create', monsterControllers.monster_create_get);

router.post('/monster/create', monsterControllers.monster_create_post);

router.get('/monster/:id/delete', monsterControllers.monster_delete_get);

router.post('/monster/:id/delete', monsterControllers.monster_delete_post);

router.get('/monster/:id/update', monsterControllers.monster_update_get);

router.post('/monster/:id/update', monsterControllers.monster_update_post);

router.get('/monster/:id', monsterControllers.monster_detail);

router.get('/monsters', monsterControllers.monster_list);

/// MONSTERINSTANCE ROUTES ///

router.get('/monsterinstance/create', monsterinstanceControllers.monsterinstance_create_get);

router.post('/monsterinstance/create', monsterinstanceControllers.monsterinstance_create_post);

router.get('/monsterinstance/:id/delete', monsterinstanceControllers.monsterinstance_delete_get);

router.post('/monsterinstance/:id/delete', monsterinstanceControllers.monsterinstance_delete_post);

router.get('/monsterinstance/:id/update', monsterinstanceControllers.monsterinstance_update_get);

router.post('/monsterinstance/:id/update', monsterinstanceControllers.monsterinstance_update_post);

router.get('/monsterinstance/:id', monsterinstanceControllers.monsterinstance_detail);

router.get('/monsterinstances', monsterinstanceControllers.monsterinstance_list);

module.exports = router;
