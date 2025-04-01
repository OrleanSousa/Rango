import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { FaHome, FaSearch, FaShoppingBag, FaHeart, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom"; // Para redirecionamento

function Footer() {
  const { isSignedIn, user } = useUser(); // Dados do Clerk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState({
    firstName: "Usuário",
    imageUrl: "https://via.placeholder.com/150/150",
  });

  useEffect(() => {
    if (isSignedIn && user) {
      setUserData({
        firstName: user.firstName || "Usuário",
        imageUrl: user.imageUrl || "https://via.placeholder.com/150/150",
      });
    } else {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          firstName: parsedUser.firstName || "Usuário",
          imageUrl: parsedUser.imageUrl || "https://via.placeholder.com/150/150",
        });
      }
    }
  }, [isSignedIn, user]);

  const isUserLoggedIn = isSignedIn || localStorage.getItem("loggedInUser");

  return (
    <>
      {!isUserLoggedIn ? (
        <footer className="flex justify-center gap-4 py-4 bg-gray-100 px-5 lg:w-[512px] lg:align-iten-center lg:m-auto">
          <SignInButton mode="modal">
            <button className="bg-white w-full h-12 flex justify-center items-center rounded-[10px] shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" fill="none">
                <path
                  fill="#1877F2"
                  d="M7.875.003 6.059 0C4.02 0 2.701 1.352 2.701 3.445v1.589H.876a.285.285 0 0 0-.286.286V7.62c0 .158.128.286.286.286H2.7v5.807c0 .158.128.286.286.286h2.381a.285.285 0 0 0 .286-.286V7.907h2.134a.285.285 0 0 0 .286-.286V5.32a.286.286 0 0 0-.285-.286H5.654V3.687c0-.647.154-.975.997-.975h1.223a.285.285 0 0 0 .286-.286V.288a.286.286 0 0 0-.285-.285Z"
                />
              </svg>
            </button>
          </SignInButton>

          <SignInButton mode="modal">
            <button className="bg-white w-full h-12 flex justify-center items-center rounded-[10px] shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" fill="none">
                <path
                  fill="#DD4B39"
                  d="M6.016 4.903h5.616a6.767 6.767 0 0 1-.132 3.159 5.394 5.394 0 0 1-1.536 2.5c-.672.615-1.491 1.039-2.456 1.273a6.407 6.407 0 0 1-3.071-.044 5.567 5.567 0 0 1-2.15-1.097A5.823 5.823 0 0 1 .664 8.72C.02 7.49-.156 6.19.137 4.815a4.544 4.544 0 0 1 .527-1.491C1.366 1.86 2.492.867 4.042.34c1.345-.468 2.69-.453 4.036.044a6.04 6.04 0 0 1 1.93 1.185c-.058.088-.16.205-.307.35-.146.118-.234.205-.263.264a6.43 6.43 0 0 0-.57.526 7.45 7.45 0 0 0-.527.57 3.06 3.06 0 0 0-1.316-.789 3.254 3.254 0 0 0-1.755-.044 3.497 3.497 0 0 0-1.799.965c-.38.41-.672.892-.877 1.448a3.522 3.522 0 0 0 0 2.325 3.65 3.65 0 0 0 1.404 1.843c.41.293.848.483 1.316.57.439.088.921.088 1.448 0a3.283 3.283 0 0 0 1.316-.526c.673-.439 1.068-1.053 1.184-1.843H6.016V4.903Zm12.723.132v1.491h-2.062v2.018h-1.492V6.526h-2.062V5.035h2.062V2.973h1.492v2.062h2.062Z"
                />
              </svg>
            </button>
          </SignInButton>
        </footer>
      ) : (
        <footer className="z-[101] rounded-lg h-[70px] w-[335px] bg-white-100 m-auto bg-white ">
          <ul className="flex items-center justify-around h-full">
            <Link to='/dashboard' className="cursor-pointer flex items-center justify-center h-full w-[20%] rounded-lg">
              <FaHome className="text-[var(--text-color)] opacity-80 text-2xl" />
            </Link>
            <Link to='/search' className="cursor-pointer flex items-center justify-center h-full w-[20%] rounded-lg">
              <FaSearch className="text-[var(--main-turquoise)] opacity-80 text-2xl" />
            </Link>
            <Link to='/cart' className="cursor-pointer flex items-center justify-center h-full w-[20%] rounded-lg">
              <FaShoppingBag className="text-[var(--text-color)] opacity-80 text-2xl" />
            </Link>
            <Link to='/favorit' className="cursor-pointer flex items-center justify-center h-full w-[20%] rounded-lg">
              <FaHeart className="text-[var(--text-color)] opacity-80 text-2xl" />
            </Link>
            <Link to='/alerts' className="cursor-pointer flex items-center justify-center h-full w-[20%] rounded-lg">
              <FaBell className="text-[var(--text-color)] opacity-80 text-2xl" />
            </Link>
          </ul>
        </footer>
      )}
    </>
  );
}

export default Footer;
