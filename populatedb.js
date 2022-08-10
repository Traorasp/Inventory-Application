#! /usr/bin/env node

console.log('This script populates some test monsters, elements, haitats and monsterinstances to database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Monster = require('./models/Monster')
var Habitat = require('./models/Habitat')
var Element = require('./models/Element')
var MonsterInstance = require('./models/MonsterInstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var habitats = []
var elements = []
var monsters = []
var monsterinstances = []

function habitatCreate(Name, Description, cb) {
  habitatdetail = {Name:Name , Description: Description }
  
  var habitat = new Habitat(habitatdetail);
       
  habitat.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Habitat: ' + habitat);
    habitats.push(habitat)
    cb(null, habitat)
  }  );
}

function elementCreate(Name, Weakness, Strengths, Description, cb) {
  elementdetail = {Name:Name,
    Description: Description,
  }
  
  if (Weakness != false) elementdetail.Weakness = Weakness
  if (Strengths != false) elementdetail.Strengths = Strengths

  var element = new Element(elementdetail);
       
  element.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Element: ' + element);
    elements.push(element)
    cb(null, element);
  }   );
}

function monsterCreate(Name, Price, Habitat, Element, Description, cb) {
  monsterdetail = { 
    Name: Name,
    Price: Price,
    Habitat: Habitat,
    Element: Element,
    Description: Description,
  }
    
  var monster = new Monster(monsterdetail);    
  monster.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Monster: ' + monster);
    monsters.push(monster)
    cb(null, monster);
  }  );
}


function monsterInstanceCreate(Name, Age, Species, cb) {
  monsterinstancedetail = { 
    Name: Name,
    Age: Age,
    Species: Species,
  }    
    
  var monsterinstance = new MonsterInstance(monsterinstancedetail);    
  monsterinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING MonsterInstance: ' + monsterinstance);
      cb(err, null)
      return
    }
    console.log('New MonsterInstance: ' + monsterinstance);
    monsterinstances.push(monsterinstance)
    cb(null, monsterinstance)
  }  );
}


function createElementHabitas(cb) {
    async.series([
        function(callback) {
          habitatCreate('Forest', 'Lavish green forest with lots of trees, bushes and other greenery.', callback);
        },
        function(callback) {
          habitatCreate('Swamp', 'A piece of land with many trees and saturated with water.', callback);
        },
        function(callback) {
          habitatCreate('Mountain', 'A rocky place with a high altitude.', callback);
        },
        function(callback) {
          habitatCreate('Lake', 'A relatively large body of water in a inland basin, usually with standstill or slow moving water.', callback);
        },
        function(callback) {
          habitatCreate('Dessert', 'A vast land covered in hills of sands, with a high temperature at day and low at night.', callback);
        },
        function(callback) {
          elementCreate("Earth", false, false, "The power or the earth and land, can manipulate any form of rocks", callback);
        },
        function(callback) {
          elementCreate("Wind", elements[0], false, "The power of the air and skies, can control the wind.", callback);
        },
        function(callback) {
          elementCreate("Water", false, elements[0], "The power of the seas and oceans, can control any form of water.", callback);
        },
        function(callback) {
          elementCreate("Fire", elements[2], false, "The power of destruction and sun, can manipulate any form of flame or fire.", callback);
        },
        ],
        // optional callback
        cb);
}


function createMonster(cb) {
    async.parallel([
        function(callback) {
          monsterCreate('Dragon', 1000, habitats[2], elements[3], "A mythical creature capable of flight and breathing fire. With impenetrable scales.", callback);
        },
        function(callback) {
          monsterCreate('Slime', 10, habitats[1], elements[2], "A small blob made of a gelatanous substance capable of cleaning things it absorbs.", callback);
        },
        function(callback) {
          monsterCreate('Unicorn', 600, habitats[0], elements[1], "A white hore with a horn growing from its forehead.", callback);
        },
        function(callback) {
          monsterCreate('Owlbear', 400, habitats[0], elements[0], "A hybrid between a bear and an owl.", callback);
        },
        function(callback) {
          monsterCreate('Kraken', 800, habitats[3], elements[2], "A giant octopus capable of entangling entire ships.", callback);
        },
        function(callback) {
          monsterCreate('mimic', 150, habitats[2], elements[0], "They are a chest looking creature with razer sharp teeth capable of moving. They can store a lot of stuff.", callback);
        },
        function(callback) {
          monsterCreate('Treant', 10, habitats[0], elements[0], "A moving tree which can extend its roots and can tranform back into a regular tree at will.", callback);
        }
        ],
        // optional callback
        cb);
}


function createMonsterInstances(cb) {
    async.parallel([
        function(callback) {
          monsterInstanceCreate("Kazimar", 790, monsters[0], callback);
        },
        function(callback) {
          monsterInstanceCreate("Steve", 1, monsters[1], callback);
        },
        function(callback) {
          monsterInstanceCreate("Bob", 2, monsters[1], callback);
        },
        function(callback) {
          monsterInstanceCreate("John", 2, monsters[1], callback);
        },
        function(callback) {
          monsterInstanceCreate("Blob", 3, monsters[1], callback);
        },
        function(callback) {
          monsterInstanceCreate("Celest", 25, monsters[2], callback);
        },
        function(callback) {
          monsterInstanceCreate("Sky", 14, monsters[2], callback);
        },
        function(callback) {
          monsterInstanceCreate("Burr", 38, monsters[3], callback);
        },
        function(callback) {
          monsterInstanceCreate("Brow", 5, monsters[3], callback);
        },
        function(callback) {
          monsterInstanceCreate("Krayxel", 453, monsters[4], callback);
        },
        function(callback) {
          monsterInstanceCreate("Mimi", 12, monsters[5], callback);
        },
        function(callback) {
          monsterInstanceCreate("Mike", 23, monsters[5], callback);
        },
        function(callback) {
          monsterInstanceCreate("Gobble", 14, monsters[5], callback);
        },
        function(callback) {
          monsterInstanceCreate("Bark", 80, monsters[6], callback); 
        },
        function(callback) {
          monsterInstanceCreate("Trent", 60, monsters[6], callback); 
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createElementHabitas,
    createMonster,
    createMonsterInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('MonsterInstances: '+ monsterinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




