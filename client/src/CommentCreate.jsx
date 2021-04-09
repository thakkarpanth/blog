import React, { useState } from 'react';
import axios from 'axios'; 

const CommentCreate = (props) => {

    const { postId } = props;
    const [content, setContent] = useState();

    const onSubmit  = async (e) => {
        e.preventDefault(); 
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        })
        setContent('');
    }
    return (
        <div>
            <form action="" onSubmit = {onSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate;