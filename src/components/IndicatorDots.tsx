type IndicatorDotsProps = {
    totalSlides: number;
    activeIndex: number;
  };
  
  function IndicatorDots({ totalSlides, activeIndex }: IndicatorDotsProps) {
    return (
      <section className="container flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`w-2 rounded-full ${activeIndex === i ? "h-5 bg-teal-600" : "h-2 bg-teal-400"}`}
          ></div>
        ))}
      </section>
    );
  }
  
  export default IndicatorDots;
  