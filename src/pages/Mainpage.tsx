import { useState, useRef } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import IndicatorDots from "../components/IndicatorDots";
import SlideContent from "../components/SlideContent";

function MainPage() {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      src: "https://george-fx.github.io/dinehub_api/assets/images/05.jpg",
      title: "Embark on Culinary Adventures",
      description: "Embark on an exciting culinary journey with our app.",
    },
    {
      src: "https://george-fx.github.io/dinehub_api/assets/images/06.jpg",
      title: "Craft Your Perfect Order",
      description: "Customize your cravings and place orders effortlessly.",
    },
    {
      src: "https://george-fx.github.io/dinehub_api/assets/images/07.jpg",
      title: "Taste the Delivered Magic",
      description: "Enjoy the convenience of doorstep culinary delights.",
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

  return (
    <div className="bg-gray-100 w-full h-screen flex justify-center items-center">
      <div id="app" className="w-full h-full flex flex-col justify-center items-center">
        <div id="screen" className="opacity-100 w-full h-full flex flex-col justify-center items-center">
          <Carousel
            slides={slides}
            handleScroll={handleScroll}
            sliderRef={sliderRef}
            imageClass="max-w-[251px] w-2/3 mx-auto"
          />
          <IndicatorDots
            totalSlides={slides.length}
            activeIndex={index}
            className="mt-4"
            activeColor="bg-teal-400"
            inactiveColor="bg-teal-300"
          />
          <SlideContent title={slides[index].title} description={slides[index].description} />
          <section className="p-5 mt-5 w-full">
            <Link to="/login">
              <button
                className="h-[48px] bg-teal-400 text-white font-dm-sans font-bold text-sm leading-relaxed 
                cursor-pointer mx-auto text-center border border-teal-600 capitalize w-full select-none 
                flex justify-center items-center rounded-lg"
              >
                Get Started
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainPage;