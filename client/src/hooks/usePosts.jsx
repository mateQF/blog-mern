import { useEffect, useState } from "react";
import { getAllPosts } from "../services/post";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return { posts };
};

export default usePosts;
