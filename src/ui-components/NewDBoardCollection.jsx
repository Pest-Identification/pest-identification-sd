/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Post as Post0 } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import Post from "./Post";



function DBoardCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Post0,
  }).items;

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


  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    async function setItemsFromDataStore() {
      var loaded = await Promise.all(
        itemsDataStore.map(async (item) => ({
          ...item,
          replies: await item.replies.toArray(),
        }))
      );
      setItems(loaded);
    }
    setItemsFromDataStore();
  }, [itemsProp, itemsDataStore]);
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
      {posts.map((post, index) => (
        <DiscussionPost
          isSearchable="true"
          searchPlaceholder="Search ."
          key={index}
          title={post.title}
          author={post.author}
          date={post.date.toDateString()}
          content={post.content}
        />
      ))}
    </div>
  </div>
  );
}


  
<Collection
type="list"
isSearchable="true"
isPaginated={true}
searchPlaceholder="Search..."
direction="column"
justifyContent="center"
items={items || []}
{...getOverrideProps(overrides, "PostCollection")}
{...rest}
>
{(item, index) => (
  <Post
    post={item}
    key={item.id}
    {...(overrideItems && overrideItems({ item, index }))}
  ></Post>
)}
</Collection>