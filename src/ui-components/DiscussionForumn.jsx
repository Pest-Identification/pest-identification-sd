import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Post, Reply } from "../models";
import DiscussionPost from "./DiscussionPost";
import "./DiscussionForum.css";

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const post = {
      title: form.title.value,
      author: form.author.value,
      date: new Date(),
      content: form.content.value,
    };
    await DataStore.save(new Post(post));
    setPosts([...posts, post]);
    form.reset();
    setShowPostForm(false); // Hide the post form after submitting
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await DataStore.query(Post);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleReplySubmit = async (postId, event) => {
    event.preventDefault();
    const form = event.target;
    const reply = {
      author: form.author.value,
      date: new Date(),
      content: form.content.value,
      postID: postId,
    };
    await DataStore.save(new Reply(reply));
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, replies: [...post.replies, reply] };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
    form.reset();
  };

  return (
    <div className="forum">
      <h2>Discussion Forum</h2>
      <button className="post-button" onClick={() => setShowPostForm(!showPostForm)}>Create new post</button>
      {showPostForm && (
        <form onSubmit={handlePostSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <DiscussionPost
            key={post.id}
            title={post.title}
            author={post.author}
            date={post.date.toDateString()}
            content={post.content}
            replies={post.replies}
            onReplySubmit={(event) => handleReplySubmit(post.id, event)}
          />
        ))
      )}
    </div>
  );
}

export default DiscussionForum;
