
type CarouselProps = {
  slides: { src: string }[];
  handleScroll: () => void;
  sliderRef: React.RefObject<HTMLDivElement>;
};

function Carousel({ slides, handleScroll, sliderRef }: CarouselProps) {
  return (
    <div className="relative h-[455px] flex justify-center items-center overflow-hidden">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="embla__container flex overflow-auto scroll-smooth snap-x snap-mandatory w-full no-scrollbar"
      >
        {slides.map((slide, i) => (
          <div key={i} className="embla__slide w-full cursor-pointer flex-shrink-0 snap-center">
            <img src={slide.src} alt="Carousel" className="max-w-[251px] w-2/3 mx-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
