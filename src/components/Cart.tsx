import { useEffect, useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  kcal: number;
  weight: number;
}

function Cart() {
  const [cart, setCart] = useState<FoodItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const increment = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrement = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="pt-5 pb-14 px-5 rounded-lg mt-2 bg-white text-center lg:w-[620px]">
      {cart.length === 0 ? (
        <>
          <img
            src="https://george-fx.github.io/dinehub_api/assets/images/02.jpg"
            alt="Empty cart"
            className="w-[calc(100%-80px)] h-auto mb-5 mx-auto"
          />
          <h2 className="text-xl font-semibold capitalize mb-4">Your cart is empty!</h2>
          <p className="text-base text-gray-600">
            Looks like you haven't made <br /> your order yet.
          </p>
          <div className="pt-5">
            <Link to={"/dashboard"}> 
                <button className="h-12 bg-teal-500 text-white font-dm-sans font-bold text-sm leading-relaxed cursor-pointer mx-auto text-center border border-main-turquoise capitalize w-full select-none flex justify-center items-center rounded-lg">
                Shop now
                </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul className="pt-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-lg pl-3 flex items-center h-[111px] flex-row mb-3 relative shadow-md"
              >
                <img src={item.image} alt={item.name} className="w-[87px] h-auto mr-4" />
                <div className="flex flex-col mr-auto h-full justify-center gap-1 items-start">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex flex-row justify-center items-center gap-2">
                  <span className="text-xs mb-1">{item.weight} g</span>
                  <p>-</p>
                  <span className="text-xs mb-1">{item.kcal} kcal</span>
                  </div>
                  <span className="text-sm text-main-color font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="h-full flex flex-col items-center justify-between">
                  <button className="p-3 rounded-md" onClick={() => decrement(item.id)}>
                    <IoMdRemoveCircle size={20} className="text-gray-700" />
                  </button>
                  <span className="text-xs leading-none">{item.quantity}</span>
                  <button className="p-3 rounded-md" onClick={() => increment(item.id)}>
                    <IoIosAddCircle size={20} className="text-gray-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <section className="p-5 rounded-lg mb-5 border border-main-turquoise">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-main-color font-medium">Subtotal</span>
              <span className="text-sm text-main-color">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-3 mb-5 border-b border-gray-200">
              <span className="text-sm">Delivery</span>
              <span className="text-sm">$0</span>
            </div>
            <div className="flex justify-between">
              <h4 className="text-lg font-semibold">Total</h4>
              <h4 className="text-lg font-semibold">${total.toFixed(2)}</h4>
            </div>
          </section>

          <button className="h-12 bg-teal-500 text-white font-dm-sans font-bold text-sm leading-relaxed cursor-pointer mx-auto text-center border border-main-turquoise capitalize w-full select-none flex justify-center items-center rounded-lg">
            Checkout
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;