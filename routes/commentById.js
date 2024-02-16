const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/:id')
    .put((req, res) => {
        try {
            const commentsData = JSON.parse(fs.readFileSync('./data/comments.json'));

            const { id } = req.params;

            const filteredList = commentsData.filter((comment) => {
                return comment.id !== id;
            })

            console.log(id)
            console.log(filteredList)

            const { name, title, comment, likes, replies } = req.body;

            if (!name || !title || !comment || !likes || !replies) {
                return res.status(400).json('Missing properties in the request body.')
            }

            const timestamp = Date.now();

            const updatedComments = [...filteredList, { id, name, title, comment, timestamp, likes, replies }];

            fs.writeFileSync("./data/comments.json", JSON.stringify(updatedComments));

            return res.status(201).json({ id, name, title, comment, timestamp, likes, replies });

        } catch (error) {
            console.error('Error editing comment:', error);
            res.status(500).json({ message: 'Error editing comment', error });
        }
    })
    .delete((req, res) => {
        try {
            const commentsData = JSON.parse(fs.readFileSync('./data/comments.json'));
    
            const { id } = req.params;

            const commentToDelete = commentsData.find((comment) => {
                return comment.id === id;
            })

            if(!commentToDelete) {
                return res.status(404).json({ message: `Comment ${id} not found` });
            }
    
            const filteredList = commentsData.filter((comment) => {
                return comment.id !== id;
            })
    
            fs.writeFileSync("./data/comments.json", JSON.stringify(filteredList));
    
            res.sendStatus(204);
        } catch (error) {
            console.error('Unable to delete comment:', error);
            res.status(500).json({ message: 'Unable to delete comment', error });
        }
    })

module.exports = router;