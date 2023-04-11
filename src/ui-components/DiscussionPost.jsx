import React, { useState } from "react";
import { DataStore } from '@aws-amplify/datastore';
import { Reply } from '../models';
import "./DiscussionPost.css";

function DiscussionPost(props) {
  const [replies, setReplies] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const replyData = {
      author: form.author.value,
      date: new Date(),
      content: form.content.value,
      post: props.postId // associate the reply with the current post
    };
    const newReply = await DataStore.save(new Reply(replyData));
    setReplies([...replies, newReply]);
    form.reset();
    setShowReplyForm(false); // Hide the reply form after submitting
  };

  return (
    <div className="post">
      <h3>{props.title}</h3>
      <p className="author">By {props.author} on {props.date}</p>
      <p className="content">{props.content}</p>
      <button className="reply-button" onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit}>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {replies.length > 0 && (
        <div className="replies">
          <h4>Replies:</h4>
          {replies.map((reply, index) => (
            <div key={index} className="reply">
              <p className="author">By {reply.author} on {reply.date.toDateString()}</p>
              <p className="content">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscussionPost;
