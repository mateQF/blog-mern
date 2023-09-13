const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <div className="flex gap-5 w-full mt-5 mb-24">
      <div className="flex items-center gap-5 w-full justify-center">
        <input
          type="text"
          placeholder="Search post by title"
          value={search}
          onChange={handleSearchChange}
          className="px-2 py-2 border rounded-md w-4/6 text-black outline-none"
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 font-bold rounded-md text-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
