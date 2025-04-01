import { useState, useEffect, useRef } from "react";
import { CiHeart } from "react-icons/ci"; // Ensure this is the correct library for CiHeart
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import IndicatorDots from "../components/IndicatorDots";
import { Link } from "react-router-dom";

function Dashboard() {

  interface FoodItem {
    id: number;
    name: string;
    weight: string;
    kcal: number;
    price: number;
    image: string;
  }


  const [index, setIndex] = useState(0);
  const [foodData, setFoodData] = useState([]); // Inicializa o estado como um array vazio

  const slides = [
    {
      src: "https://george-fx.github.io/dinehub_api/assets/banners/01.jpg",
    },
    {
      src: "https://george-fx.github.io/dinehub_api/assets/banners/01.jpg",
    },
    {
      src: "https://george-fx.github.io/dinehub_api/assets/banners/01.jpg",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null!);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setIndex(newIndex);
    }
  };

  // Carrega os dados do arquivo JSON ao montar o componente
  useEffect(() => {
    fetch("/data/food.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        return response.json();
      })
      .then((data) => setFoodData(data)) // Atualiza o estado com os dados carregados
      .catch((error) => console.error("Erro ao carregar os dados do JSON:", error));
  }, []);

  return (
    <>
      <div className="container flex flex-col justify-center position: absolute bg-gray-100">
        <Header />
        <section className="mb-7.5 mt-2.5 position: relative">
          <div className="flex flex-col max-h-[434px]">
            <Carousel
              slides={slides}
              handleScroll={handleScroll}
              sliderRef={sliderRef}
              imageClass="w-full h-full object-cover"
              containerClass="flex justify-center"
            />
            <IndicatorDots
              totalSlides={slides.length}
              activeIndex={index}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 "
            />
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mx-5 mb-3">
            <h4 className="capitalize truncate">We offer</h4>
          </div>
          <div className="w-full">
            <div className="swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
              <div className="swiper-wrapper flex overflow-x-auto no-scrollbar">
                {[
                  { src: "01.jpg", alt: "Salads" },
                  { src: "02.jpg", alt: "Meat" },
                  { src: "03.jpg", alt: "Pasta" },
                  { src: "04.jpg", alt: "Soups" },
                  { src: "05.jpg", alt: "Hot meals" },
                  { src: "06.jpg", alt: "Fish" },
                ].map(({ src, alt }, idx) => (
                  <div key={idx} className="swiper-slide inline-block mx-2">
                    <button className="relative w-[90px] h-[90px] rounded-lg overflow-hidden">
                      <img
                        src={`https://george-fx.github.io/dinehub_api/assets/menu/${src}`}
                        alt={alt}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <span className="absolute bottom-0 left-0 bg-white rounded-t-lg text-main-color text-center w-full py-1">
                        {alt}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mb-10">
  <div className="flex justify-between items-center mx-5 mb-3">
    <h4 className="capitalize truncate">Recommended for you</h4>
  </div>

  {/* Container do carousel */}
  <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-5">
  <div className="flex space-x-4">
    {foodData.map((item: FoodItem) => (
      <Link to={`/item/${item.id}`} key={item.id}>
        <div className="bg-white p-2 rounded-lg shadow min-w-[250px] snap-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="flex justify-end">
            <CiHeart className="w-10 h-6" />
          </div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-[10px]">Peso: {item.weight}</p>
          <p className="text-teal-500 font-bold mt-2">
            R$ {item.price.toFixed(2)}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>

</div>

        <section className="px-5 py-2.5">
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Dashboard;