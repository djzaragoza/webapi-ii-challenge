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

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'The posts information could not be retrieved. ', err});
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ success: false, error: 'The post with the specified ID does not exist. '});
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'The post information could not be retrieved.', err });
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ success: false, error: 'The post with the specified ID does not exist. ' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'The post could not be removed. ', err });
        });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const newPost = req.body;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ success: false, error: 'Please provide title and contents for the post. '});
    } else {
        db.update(id, newPost)
            .then(post => {
                if(post) {
                    res.status(200).json({ success: true, post });
                } else {
                    res.status(404).json({ success: false, error: 'The post with the specified ID does not exist. '});
                }
            })
            .catch(err => {
                res.status(500).json({ success: false, error: 'The post information could not be modified.', err });
            });
    }
});

module.exports = router;