const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.route('/')
    .get((_req, res) => {
        res.json('Welcome to / for Kijiji forums');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})