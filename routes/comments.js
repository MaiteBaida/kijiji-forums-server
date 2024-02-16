const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .get((_req, res) => {
        const data = JSON.parse(fs.readFileSync(`./data/comments.json`));
        return res.status(200).json(data);
    })
    .post((req, res) => {
        try {
            const commentsData = JSON.parse(fs.readFileSync('./data/comments.json'));
    
            const newComment = {
                id: commentsData.length + 1, 
                name: req.body.name,
                title: req.body.title,
                comment: req.body.comment,
                timestamp: Date.now(), 
                likes: 0, 
                replies: [] 
            };
    
            commentsData.push(newComment);

            fs.writeFileSync('./data/comments.json', JSON.stringify(commentsData, null, 2));

            res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Failed to add comment' });
        }
    })

module.exports = router;
