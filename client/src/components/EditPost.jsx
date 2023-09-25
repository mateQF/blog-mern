import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { getPost } from "../services/post";
import { PostContext } from "../context/PostContext";
import FormPost from "./PostForm"
import { useForm } from "react-hook-form";

const EditPost = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { updatePost } = useContext(PostContext);

  useEffect(() => {
    getPost(id)
      .then((post) => {
        setValue("title", post.title);
        setValue("summary", post.summary);
        setValue("content", post.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("content", data.content);
    formData.append("id", id);
    if (data.files?.[0]) {
      formData.append("file", data.files?.[0]);
    }
    try {
      const { status } = await updatePost(id, formData);
      if (status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      setError("postError", {
        type: "manual",
        message: error.response.data,
      });
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <FormPost
      errors={errors}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      update={true}
      clearErrors={clearErrors}
    />
  );
};

export default EditPost;
