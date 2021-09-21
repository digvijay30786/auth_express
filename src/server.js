const express = require('express');
const port = 2345;
const server = express();
const connect = require('./configs/db');
const post = require('./model/post.model');
const { signin, signup } = require('./controller/user.controller');
server.use(express.json());
server.post('/signup', signup);
server.post('/signin', signin);

server.post('/post', async (req, res) => {

    try
    {
        const postSet = await post.create(req.body);
        res.status(201).json({ postSet });
    }
    catch(err)
    {
        res.status(500).json({ "type": "error", "msg": err.message });
    }
});



server.listen(port,async ()=> {
    await connect();
    console.log(`srever is running on port : ${port}`);
});