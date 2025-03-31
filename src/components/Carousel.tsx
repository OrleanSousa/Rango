import React, { useEffect, useRef, useState } from "react";

type CarouselProps = {
  slides: { src: string }[];
  handleScroll: () => void;
  sliderRef: React.RefObject<HTMLDivElement>;
  imageClass?: string; // Classe CSS dinâmica para imagens
  containerClass?: string; // Classe CSS dinâmica para o container principal
};

function Carousel({ slides, handleScroll, sliderRef, imageClass, containerClass }: CarouselProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência ao timer
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar o índice atual

  // Função que move o carousel automaticamente
  const autoScroll = React.useCallback(() => {
    if (sliderRef.current) {
      const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1; // Reseta o índice ao chegar no último slide
      setCurrentIndex(nextIndex);

      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * nextIndex, // Move para o próximo slide
        behavior: "smooth", // Animação suave
      });
    }
  }, [currentIndex, slides.length, sliderRef]);

  // Configura o timer automático para 4 segundos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      autoScroll();
    }, 8000); // 4 segundos entre cada slide

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Limpa o timer ao desmontar o componente
    };
  }, [autoScroll]);

  return (
    <div className={`relative flex justify-center items-center overflow-hidden ${containerClass || ""}`}>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="embla__container flex overflow-auto scroll-smooth snap-x snap-mandatory w-full no-scrollbar"
      >
        {slides.map((slide, i) => (
          <div key={i} className="embla__slide w-full cursor-pointer flex-shrink-0 snap-center">
            <img src={slide.src} alt={`Slide ${i + 1}`} className={`object-contain ${imageClass || ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;