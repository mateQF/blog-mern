import { customAxios } from "./axios";

export const getAllPosts = async () => {
  const { data } = await customAxios.get("/posts");
  return data;
};

export const getPost = async (id) => {
  const { data } = await customAxios.get(`/post/${id}`);
  return data;
};

export const createPost = async (formData) => {
  const response = await customAxios.post("/post", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updatePost = async (id, formData) => {
  const response = await customAxios.put(`/update/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deletePost = async (id) => {
  const response = await customAxios.delete(`/delete/${id}`, {
    withCredentials: true,
  });
  return response;
};
