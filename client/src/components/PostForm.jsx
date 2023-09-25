const FormPost = ({ handleSubmit, register, errors, update = false, title = '', summary = '', content = '', clearErrors }) => {
  return (
    <div className="p-10">
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          handleSubmit(); 
          clearErrors();
        }}
        className="flex flex-col gap-10 p-10 border-4 rounded-lg lg:w-[60rem] m-auto"
      >
        <h1 className="text-3xl text-center">
          {update ? (
            <>
              Update your <span className="text-blue-500">Post</span>
            </>
          ) : (
            <>
              Create your <span className="text-blue-500">Post</span>
            </>
          )}
        </h1>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          defaultValue={title}
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
        />
        <input
          type="text"
          placeholder="Summary"
          {...register("summary")}
          defaultValue={summary}
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
        />
        <input
          type="file"
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border cursor-pointer"
          {...register("files")}
        />
        <div className="flex flex-col">
          <label htmlFor="content" className="mb-5 text-xl">
            Content:
          </label>
          <textarea
            cols="30"
            rows="10"
            {...register("content")}
            defaultValue={content}
            name="content"
            className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
          ></textarea>
        </div>
        <button className="bg-white text-black font-bold p-2 w-auto rounded-xl text-xl">
          {update ? (
            <>
              Update <span className="text-blue-500">Post</span>
            </>
          ) : (
            <>
              Create <span className="text-blue-500">Post</span>
            </>
          )}
        </button>
        {errors.postError && (
          <div className="flex flex-col gap-2">
            {errors.postError.message.errors.map((error, index) => (
              <p
                className="text-white bg-red-500 p-2 text-center rounded-md"
                key={index}
              >
                {error.message}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPost;
