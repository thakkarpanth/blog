const express = require('express');
const {randomBytes} = require('crypto'); 
const cors = require('cors');
const axios = require('axios');

const app = express(); 
app.use(cors());
app.use(express.json());

const commentsByPostId = {}; 

app.get('/posts/:id/comments' , (req, res)=>{
    res.send(commentsByPostId[req.params.id] || []); 
});

app.post('/posts/:id/comments' ,async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const commentContent = req.body.content;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id : commentId , content : commentContent});
    commentsByPostId[req.params.id] = comments ;
    await axios.post('http://localhost:4005/events' , {
        type : "Comment Created",
        data : {
            id: commentId,
            content : commentContent,
            postId : req.params.id,
        }
    })
    res.status(201).send(comments);
});

app.post('/events' , (req , res) => {
    console.log("Received Event" , req.body.type);
    res.send({});
});

app.listen(4001 , () =>{
    console.log("Listening on Port 4001")
})