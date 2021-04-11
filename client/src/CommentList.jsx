import React from 'react';

const CommentList = (props) => {
    const { comments } = props;
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