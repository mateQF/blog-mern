import Post from "./Post";
import usePosts from "../hooks/usePosts";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import SearchBar from "./SearchBar";

const Home = () => {
  const { posts } = usePosts();
  const { isAuthenticated } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const results = !search ? posts : posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <section className="px-10 py-10 pt-20">
      <SearchBar search={search} handleSearchChange={handleSearchChange}/>
      <div className="flex flex-wrap items-center gap-16 justify-center">
        {results?.length > 0 ? (
          results.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        ) : (
          <div className="flex flex-col gap-5">
            <p>No posts published yet.</p>
            {isAuthenticated && (
              <Link
                to={"/create"}
                className="bg-white text-black font-bold p-2 rounded-lg text-center text-xl"
              >
                Be the first publisher!
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
