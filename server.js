const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4251

let currentNote = {};

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get ('/api/notes', function(err, res) {
    try {
        currentNote = fs.readFileSync('db/db.json', 'utf-8');
        console.log('reading!')

        currentNote = JSON.parse(currentNote);
    } catch (err) {
        console.log('n\ error (in app.get.catch):');
        console.log(err);
    };
    res.json(currentNote);
});

app.post('/api/notes', function(req, res) {
    try{
        currentNote = fs.readFileSync('./db/db.json', 'utf-8');
        console.log(currentNote);

        currentNote = JSON.parse(currentNote);
        req.body.id = currentNote.length;
        currentNote.push(req.body);
        currentNote = JSON.stringify(currentNote);
        fs.writeFile('./db/db.json', currentNote, 'utf-8', function(err) {
            if (err) throw err;
        });
        res.json(JSON.parse(currentNote));

    } catch (err) {
        throw err;
        console.error(err);
    }
});

app.delete('/api/notes/:id', function(req, res) {
    try {
        currentNote = fs.readFileSync('./db/db.json', 'utf-8');
        currentNote = JSON.parse(currentNote);
        currentNote = currentNote.filter(function(note) {
           return note.id != req.params.id; 
        });
        currentNote = JSON.stringify(currentNote);
        fs.writeFile('./db/db.json', currentNote, 'utf-8', function(err) {
            if (err) throw err;
        });
        res.send(JSON.parse(currentNote));
    } catch (err) {
        throw err;
        console.log(err);
    }
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes/:id', function(req, res) {
    return res.sendFile(path.json(__dirname, 'db/db.json'));
});

app.listen(PORT, function() {
    console.log('App listening on http://localhost:' + PORT);
});
