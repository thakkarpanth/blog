import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = (props) => {
    const {postId}  = props ;
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }
    useEffect(() => {
        getComments();
    }, [])

    return (
        <ul>
            {
                comments.map(comment => {
                    return (
                        <li key={comment.id}>
                            {comment.content}
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default CommentList;