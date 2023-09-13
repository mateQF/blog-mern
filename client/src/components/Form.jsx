import { Link } from "react-router-dom";

const Form = ({ handleSubmit, register, title, errors, isLogin = false }) => {
  console.log(errors);
  return (
    <div className="p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form
        className="m-auto flex flex-col gap-10 p-10 border-4 rounded-lg sm:w-[30rem]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl">{title}</h1>

        <input
          type="text"
          className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
          placeholder="Johndoe1"
          {...register("username")}
        />
        <div className="flex flex-col gap-3">
          <input
            type="password"
            className="py-2 px-2 outline-none rounded-md text-white bg-transparent border"
            placeholder="Password"
            {...register("password")}
          />
          {isLogin ? (
            <Link to={"/register"} className="text-blue-500 hover:underline">
              Do not have an account yet? Sign up
            </Link>
          ) : (
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Already have an account? Sign In
            </Link>
          )}
        </div>
        <button className="bg-white text-black font-bold p-2 w-auto rounded-xl text-xl">
          {title}
        </button>
        {errors.registerError && (
          <div className="flex flex-col gap-2">
            {errors.registerError.message.split("\n").map((error, index) => (
              <p className="text-white bg-red-500 p-2 text-center rounded-md" key={index}>{error}</p>
            ))}
          </div>
        )}
        {errors.loginError && (
          <p className="text-white bg-red-500 p-2 text-center rounded-md">
            {errors.loginError.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
