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
        const { id, content, postId , status } = data;
        console.log("post id ",postId);
        const comments = posts[postId].comments;
        comments.push({
            id, content,status
        });
        posts[postId].comments = comments ;

    }
    if(type === 'CommentUpdated'){
        const {id , postId , status , content} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id); 
        comment.status = status ;
        comment.content = content ;         

    }
    res.send({});
});

app.listen(4002, () => {
    console.log("Listening on 4002")
})