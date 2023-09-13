import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const baseUrl = "http://localhost:8000";
  return (
    <div className="bg-[#333] sm:w-[30rem] h-[35rem] relative rounded-2xl">
      <div className="max-w-full">
        <Link to={`/post/${post._id}`}>
          <img
            src={`${baseUrl}/${post.file}`}
            alt={post.title}
            className="w-[30rem] h-[19rem] rounded-t-2xl"
          />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/post/${post._id}`} className="hover:underline">
          <h2 className="font-bold text-3xl line-clamp-2">{post.title}</h2>
        </Link>
        <p className="flex items-center gap-4 mt-2">
          <a className="text-blue-500 font-bold">{post.author.username}</a>
          <time className="text-sm">
            {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
          </time>
        </p>
        <p
          className="text-lg line-clamp-3 absolute bottom-5 left-0 px-4"
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {post.summary}
        </p>
      </div>
    </div>
  );
};

export default Post;
