const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .put((req, res) => {
        const commentsData = JSON.parse(fs.readFileSync('./data/comments.json'));

        const { id } = req.params;

        const filteredList = commentsData.filter((comment) => {
            return comment.id !== id;
        })

        const { name, title, comment, timestamp, likes, replies } = req.body;

        const updatedComments = [...filteredList, { id, name, title, comment, timestamp, likes, replies }];

        fs.writeFileSync("./data/comments.json", JSON.stringify(updatedComments));

        return res.status(201).json({ id, name, title, comment, timestamp, likes, replies });
    })

module.exports = router;