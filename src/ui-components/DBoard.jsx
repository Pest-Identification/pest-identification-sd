import React, { useState } from "react";
import {Storage, DataStore} from 'aws-amplify';
import DiscussionPost from "./DiscussionPost";
import './DBoard.css';
import { Post, User } from "../models";
import { Predicates, SortDirection } from "@aws-amplify/datastore";
import { createPost } from "../modules/datastore";

function getDate(posts){
    const d = new Date(posts.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }


export function DBoard({props}) {


    const [posts, setPosts] = React.useState([]);
    const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
    const [filterFunction, setFilterFunction] = React.useState((Predicates.ALL));
    const [displayCount, setDisplayCount] = React.useState(20);
  
    
  
    React.useEffect(() => {
      
      let newPosts = [];
  
      DataStore.query(Post,
        filterFunction, {
        sort: sortFunction,
        page: 0,
        limit: displayCount}
      ).then((datastorePosts) => {
        let promises = [];
      
        for (const [index, item] of datastorePosts.entries()){
          //console.log("Parsing:", item)
          newPosts.push({...item, user: ""});
          promises.push(DataStore.query(User, item.authorID).then(r => {
            //console.log('r:', r);
            if (r == undefined) return {value: "Unknown", index: index, field: "user"};
            return {value: r.userName, index: index, field: "user"};
          })); 
        }
      
        //console.log('newPosts before Promise.allSettled:', newPosts);
        setPosts(datastorePosts);
      
        return Promise.allSettled(promises).then((results) => {
          //console.log('Promise.allSettled results:', results);
          for(let r of results){
            if (r && r.value) {
              newPosts[r.value.index][r.value.field] = r.value.value;
            }
          }
        })
      }).then(() => {
        //console.log('newPosts after Promise.allSettled:', newPosts);
        //console.log('posts:', posts);
        setPosts(newPosts);
      });
      
  
    }, [sortFunction, displayCount]);

  const [isFormVisible, setIsFormVisible] =  React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const post = {
      title: form.title.value,
      content: form.content.value,
    };
    createPost(post.title, post.content, null);
    setPosts([...posts, post]);
    form.reset();
    setIsFormVisible(false);
  };

  return (
    <div className="discussion-board">
      <h2>Discussion Board</h2>
      {!isFormVisible && (
        <button type="button" className="post-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        Make a Post
      </button>
           
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </form>
      )}
      <div className="posts">
        {posts.map((item, index) => (
          <DiscussionPost
            key={index}
            title={item.title}
            author={item.user}
            date={getDate(item)}
            content={item.body}
            postId={item.id}
          />
        ))}
      </div>
    </div>
  );
}
