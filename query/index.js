const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {

    const { type, data } = req.body;
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        }
    }
    if (type === 'Comment Created') {
        const { id, content, postId } = data;
        console.log("post id ",postId);
        const comments = posts[postId].comments;
        comments.push({
            id, content
        });
        posts[postId].comments = comments ;

    }
    res.send({});
});

app.listen(4002, () => {
    console.log("Listening on 4002")
})