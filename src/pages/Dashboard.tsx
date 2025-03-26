import { useState, useRef } from "react";
import Header from '../components/Header'
import Carousel from "../components/Carousel";
import IndicatorDots from "../components/IndicatorDots";

function Dashboard() {
  const [index, setIndex] = useState(0);
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
  return (
  <div className="container flex flex-col justify-center position: absolute" >
      <Header/>
    <div className="flex flex-col  max-h-[434px]">
      
    <Carousel
        slides={slides}
        handleScroll={handleScroll}
        sliderRef={sliderRef}
        imageClass="w-full h-full object-cover"
        containerClass="flex justify-center " // Imagem ocupando toda a div
      />
      <IndicatorDots
          totalSlides={slides.length}
          activeIndex={index}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10" // Posiciona sobre o slide
        />
    
    </div>
    
    </div>
    
  )
}

export default Dashboard