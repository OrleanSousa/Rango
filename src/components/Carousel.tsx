type CarouselProps = {
  slides: { src: string }[];
  handleScroll: () => void;
  sliderRef: React.RefObject<HTMLDivElement>;
  imageClass?: string; // Classe CSS dinâmica para imagens
  containerClass?: string; // Classe CSS dinâmica para o container principal
};

function Carousel({ slides, handleScroll, sliderRef, imageClass, containerClass }: CarouselProps) {
  return (
    <div className={`relative flex justify-center items-center overflow-hidden ${containerClass || ''}`}>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="embla__container flex overflow-auto scroll-smooth snap-x snap-mandatory w-full no-scrollbar"
      >
        {slides.map((slide, i) => (
          <div key={i} className="embla__slide w-full cursor-pointer flex-shrink-0 snap-center">
            <img
              src={slide.src}
              alt="Carousel"
              className={` object-contain ${imageClass || ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
