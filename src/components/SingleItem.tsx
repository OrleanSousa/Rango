import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";

interface FoodItem {
  id: number;
  name: string;
  weight: string;
  kcal: number;
  price: number;
  image: string;
  description: string;
}

function SingleItem() {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [dish, setDish] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetch("/data/food.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const selectedDish = data.find((item) => item.id === Number(id));
          setDish(selectedDish || null);
        }
      })
      .catch((error) => console.error("Erro ao carregar os dados:", error));
  }, [id]);

  if (!dish) {
    return <p>Loading...</p>;
  }

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <main className="overflow-auto">
      <section className="relative mb-8">
        <img src={dish.image} alt={dish.name} className="w-full h-auto" />
        <button className="absolute top-6 right-6 rounded-sm">
          <AiOutlineHeart size={24} />
        </button>
      </section>

      <section className="container px-4 flex-col">
        <div className="flex justify-between items-center mb-3 ">
          <h3 className="capitalize truncate text-3xl">{dish.name}</h3>
          <span className="text-base ml-4 whitespace-nowrap">{dish.kcal} kcal - {dish.weight}g</span>
        </div>
        <p className="text-base">{dish.description}</p>
      </section>

      <section className="p-5">
        <div className="flex justify-between items-center bg-white rounded-lg px-5 py-3 mb-2">
          <span className="font-bold text-lg">R$ {dish.price.toFixed(2)}</span>
          <div className="flex items-center">
            <button className="p-5 rounded-md" onClick={decrement}>
              <FiMinus size={14} />
            </button>
            <span className="mx-2 font-bold text-base text-current">{quantity}</span>
            <button className="p-5 rounded-md" onClick={increment}>
              <FiPlus size={14} />
            </button>
          </div>
        </div>
        <button className="h-12 bg-teal-500 text-white font-bold text-sm leading-7 cursor-pointer w-full flex justify-center items-center rounded-lg border border-main-turquoise capitalize">
          + Add to cart
        </button>
        <button className="h-12 bg-transparent text-main-turquoise font-bold text-sm leading-7 cursor-pointer w-full flex justify-center items-center rounded-lg border border-main-turquoise capitalize mt-2">
          Reviews
        </button>
      </section>
    </main>
  );
}

export default SingleItem;
