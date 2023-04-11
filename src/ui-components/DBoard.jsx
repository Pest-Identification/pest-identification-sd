import React, { useState } from "react";
import {Storage, DataStore} from 'aws-amplify';
import DiscussionPost from "./DiscussionPost";
import './DBoard.css';
import { Post } from "../models";
import { Predicates, SortDirection } from "@aws-amplify/datastore";




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
  
          //for (const [index, item] of datastoreReports.entries()){
           // promises.push(Storage.get(item.reply).then(r => {return {value: r, index: index, field: "url"}}), 
         //                 DataStore.query(User, item.authorID).then(r => {return {value: r.userName, index: index, field: "user"}}));
         // }
        
         console.log(datastorePosts);
         setPosts(datastorePosts);
          return Promise.allSettled(promises).then((results) => {
            for(let r of results){
              newPosts[r.value.index][r.value.field] = r.value.value;
            }
          })
  
        }).then(() => {
          //setPosts(newPosts);
        });
  
    }, [sortFunction, displayCount]);

  const [isFormVisible, setIsFormVisible] =  React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const post = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value,
      date: new Date(),
    };
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
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </form>
      )}
      <div>
        {console.log("Hi", posts)}
        {posts.map((item) => (
          <DiscussionPost
            key={item.id}
            title={item.title}
            author={item.User}
            date={item.createdAt}
            content={item.body}
          />
        ))}
      </div>
    </div>
  );
}
