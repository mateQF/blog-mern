import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { useForm } from "react-hook-form";
import FormPost from "./PostForm"

const CreatePost = () => {
  const [redirect, setRedirect] = useState(false);
  const {
    handleSubmit,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  const { createPost } = useContext(PostContext);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("content", data.content);
    formData.append("file", data.files[0]);
    try {
      const { status } = await createPost(formData);
      if (status === 201) {
        setRedirect(true);
      }
    } catch (error) {
      setError("postError", {
        type: "manual",
        message: error.response.data,
      });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <FormPost
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      clearErrors={clearErrors}
    />
  );
};

export default CreatePost;
