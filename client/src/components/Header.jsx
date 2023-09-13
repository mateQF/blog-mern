import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { user, logout } = useContext(UserContext);

  const handleMenuOpened = () => {
    setMenuOpened(!menuOpened);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="py-5 px-10 flex justify-between w-full bg-blue-500 items-center">
      <Link to="/" className="flex gap-2 cursor-pointer items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        Home
      </Link>
      <OutsideClickHandler
        onOutsideClick={() => {
          setMenuOpened(false);
        }}
      >
        <nav className="relative cursor-pointer flex items-center gap-5">
          {user?.username ? (
            <>
              <Link
                className="font-bold rounded-md border bg-white text-black p-1.5"
                to={"/create"}
              >
                Create new post
              </Link>
              <span
                className="flex items-center gap-1"
                onClick={handleMenuOpened}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                {user?.username}
              </span>
              {menuOpened && (
                <div className="absolute right-0 top-10 w-32 bg-white text-black border rounded-md shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setMenuOpened(false)}
                  >
                    My Posts
                  </Link>
                  <span
                    className="block px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <Link className="font-bold" to="/login">
                Sign in
              </Link>
              <Link
                className="font-bold rounded-md border bg-white text-black p-1.5"
                to="/register"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </OutsideClickHandler>
    </header>
  );
};

export default Header;
