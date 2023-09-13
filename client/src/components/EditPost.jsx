import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { getPost } from "../services/post";
import { PostContext } from "../context/PostContext";

const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { updatePost } = useContext(PostContext);

  useEffect(() => {
    getPost(id)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setSummary(post.summary);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("id", id);
    if (files?.[0]) {
      formData.append("file", files?.[0]);
    }
    try {
      const { status } = await updatePost(id, formData);
      if (status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 p-10 border-4 rounded-lg lg:w-[60rem] m-auto"
      >
        <h1 className="text-3xl text-center">
          Update your <span className="text-blue-500">post</span>
        </h1>
        <input
          type="text"
          placeholder="Title"
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border cursor-pointer"
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <div className="flex flex-col">
          <label htmlFor="content" className="mb-5 text-xl">
            Content:
          </label>
          <textarea
            cols="30"
            rows="10"
            name="content"
            className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
          ></textarea>
        </div>
        <button className="bg-white text-black font-bold p-2 w-auto rounded-xl text-xl">
          Update <span className="text-blue-500">Post</span>
        </button>
      </form>
    </div>
  );
};

export default EditPost;
