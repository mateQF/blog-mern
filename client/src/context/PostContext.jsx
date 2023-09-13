import { createContext, useState } from "react";
import {
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "../services/post";
import usePosts from "../hooks/usePosts";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { posts: postsHook } = usePosts();
  const [posts, setPosts] = useState(postsHook);

  const createPost = async (formData) => {
    try {
      const response = await createPostService(formData);
      if (response.status === 200) {
        setPosts((prev) => [...prev, response.data]);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updatePost = async (id, formData) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id !== id ? post : { ...post, ...formData }
        )
      );
      const response = await updatePostService(id, formData);
      return response;
    } catch (error) {
      setPosts((prevPosts) => prevPosts);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await deletePostService(id);
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, createPost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
}
