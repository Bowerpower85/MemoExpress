// Linking the db.json to the route.
const db = require('../db/db.json');

const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

//route
module.exports = function(route) {
  route.get('/api/notes' function(req, res) {
    res.json(db);
  });

  route.post('api/notes', function(req, res) {
    let newNote = req.body;
    let lastId = db[db.length - 1]['id'];
    let newId = lastId + 1;

    newNote['id'] = newId;

    console.log('req.body:', req.body);
    db.push(newNote)

    writeFileAsync('.db.db.json', JSON.stringify(db)).then(function() {
      console.log('db.json has been updated!');
    });
    res.json(newNote);
  });

  route.delete('/api/notes/:id', function(req, res) {
    console.log('Req.params;', req.params);
    let chosenId = parseInt(req.params.id);
    console.log(chosenId);

    for (let i = 0; i < db.length; i++) {
      if (chosenId === db[i].id) {
        db.splice(i,1);

        let noteJSON = JSON.stringify(db, null, 2);

        writeFileAsync('./db/db.json'. noteJSON).then(function() {
          console.log('Chosen note has been delete!');
        });
      };
    };
    res.json(db); 
  });
};

