import React, { useState } from "react";
import { DataStore } from 'aws-amplify';
import { Reply, User } from '../models';
import "./DiscussionPost.css";
import { Predicates, SortDirection } from "@aws-amplify/datastore";

function getDate(replies){
    const d = new Date(replies.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }


export function DiscussionPost(props) {

    const [replies, setReplies] = React.useState([]);
    const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
    const [filterFunction, setFilterFunction] = React.useState((Predicates.ALL));
    const [displayCount, setDisplayCount] = React.useState(20);
  const [showReplyForm, setShowReplyForm] = useState(false);

  React.useEffect(() => {
      
    let newReplies = [];

    


    DataStore.query(Reply,
      filterFunction, {
      sort: sortFunction,
      page: 0,
      limit: displayCount}
    ).then((datastoreReplies) => {
      let newReplies = [];
      let promises = [];
    
      for (const [index, item] of datastoreReplies.entries()){
        newReplies.push({...item, user: ""});
        promises.push(DataStore.query(User, item.authorID).then(r => {
          console.log('r:', r);
          return {value: r.userName, index: index, field: "user"};
        })); 
      }
    
      console.log('newPosts before Promise.allSettled:', newReplies);
      setReplies(datastoreReplies);
    
      return Promise.allSettled(promises).then((results) => {
        console.log('Promise.allSettled results:', results);
        for(let r of results){
          if (r && r.value) {
            newReplies[r.value.index][r.value.field] = r.value.value;
          }
        }
      })
    }).then(() => {
      console.log('newPosts after Promise.allSettled:', newReplies);
      console.log('posts:', replies);
      // setPosts(newPosts);
    });
    

  }, [sortFunction, displayCount]);

const [isFormVisible, setIsFormVisible] =  React.useState(false);



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
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {replies.length > 0 && (
        <div className="replies">
          <h4>Replies:</h4>
          {replies.map((item, index) => (
            <div key={index} className="reply">
              <p className="title">{item.title}</p>
              <p className="author">By {item.author} on {getDate(item)}</p>
              <p className="content">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscussionPost;
