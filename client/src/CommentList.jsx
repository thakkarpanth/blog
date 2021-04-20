import React from 'react';

const CommentList = (props) => {
  const { comments } = props;
  return (
    <ul>
      {
        comments.map(comment => {
          return (
            <li key={comment.id}>
              {comment.status === "approved" ? comment.content : null}
              {comment.status === "pending" ? "This content is awaiting moderation" : null}
              {comment.status === "rejected" ? "This content has been rejected" : null}

            </li>
          )
        })
      }
    </ul>
  )
}
export default CommentList;