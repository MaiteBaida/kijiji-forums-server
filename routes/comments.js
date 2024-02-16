const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .get((_req, res) => {
        const data = JSON.parse(fs.readFileSync(`./data/comments.json`));
        return res.status(200).json(data);
    })
    // .post((req, res) => {
    //     const { title, description, image } = req.body;

    //     if (!title || !description) {
    //         return res.status(400).json("All video uploads must have a title and a description.")
    //     }

    //     const data = JSON.parse(fs.readFileSync(`./data/videos.json`));
    //     const id = uuid.v4();
    //     const newVideo = {id, title, description, image}; 
    //     fs.writeFileSync("./data/videos.json", JSON.stringify([...data, newVideo]));
    //     return res.status(201).json(newVideo);
    // })