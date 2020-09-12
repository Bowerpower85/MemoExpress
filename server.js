const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4251

let currentNote = {};

app.use(express.static(path.join(__dirname, index.html)))
app.use(express.static(path.join(__dirname, notes.html)))
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