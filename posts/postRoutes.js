const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    const post = req.body;

    if(!post.title || !post.contents) {
        res.status(400).json({ success: false, error: 'Please provide title and contents for the post '});
    } else {
        db.insert(post)
        .then(posts => {
            res.status(201).json({ success: true, posts });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'There was an error while saving the post to the database. ', err });
        });
    }
});

