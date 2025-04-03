import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser  } from "@clerk/clerk-react";
import { FaShoppingCart } from "react-icons/fa";
import HamburguerMenu from "./HamburguerMenu";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useUser ();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ price: number; quantity: number }[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

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
      const storedUser  = localStorage.getItem("loggedInUser ");
      if (storedUser ) {
        const parsedUser  = JSON.parse(storedUser );
        setUserData({
          firstName: parsedUser .firstName || "Usuário",
          imageUrl: parsedUser .imageUrl || "https://via.placeholder.com/150/150",
        });
      }
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    // Recupera o carrinho do localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Calcula o total do carrinho sempre que cartItems mudar
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isUserLoggedIn = isSignedIn || localStorage.getItem("loggedInUser ");
  const isItemMenuPage = location.pathname.includes("item");

  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow w-full top-0 left-0 z-10">
      {isItemMenuPage ? (
        <button onClick={() => navigate(-1)} className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
            <path
              fill="#0C1D2E"
              d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 0Z"
            />
          </svg>
        </button>
      ) : (
        isUserLoggedIn && (
          <img
            src={userData.imageUrl}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            onClick={toggleMenu}
          />
        )
      )}

      <div className="ml-auto flex flex-row">
        <Link to={"/cart"}>
          <div className="relative">
            {cartTotal > 0 && (
              <div
                className="absolute bg-teal-500 px-[5px] py-[3px] rounded-[12px] bottom-[-6px] right-[-10px] flex items-center justify-center text-white font-bold text-[10px] font-dm-sans"
              >
                ${cartTotal.toFixed(2)}
              </div>
            )}
            <FaShoppingCart className="text-gray-800 text-2xl cursor-pointer" />
          </div>
        </Link>
      </div>

      <HamburguerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;