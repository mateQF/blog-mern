import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const UserPostPage = () => {
  const {
    user: { posts },
  } = useContext(UserContext);

  return (
    <section className="px-10 py-10">
      <div className="flex flex-wrap items-center gap-16 justify-center">
        {posts?.length > 0 ? (
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        ) : (
          <div className="flex flex-col gap-5">
            <p>You did not publish any post yet.</p>
            <Link
              className="bg-white text-black font-bold p-2 rounded-lg text-center text-xl"
              to={"/create"}
            >
              Create my first post
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPostPage;
