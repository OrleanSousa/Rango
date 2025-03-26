type IndicatorDotsProps = {
  totalSlides: number;
  activeIndex: number;
  className?: string; // Classe CSS opcional para estilização personalizada
  activeColor?: string; // Cor personalizada para o indicador ativo
  inactiveColor?: string; // Cor personalizada para os indicadores inativos
};

function IndicatorDots({
  totalSlides,
  activeIndex,
  className,
  activeColor = "bg-white", // Cor padrão para o indicador ativo
  inactiveColor = "bg-gray-300", // Cor padrão para os indicadores inativos
}: IndicatorDotsProps) {
  return (
    <section className={`flex justify-center gap-2 ${className || ""}`}>
      {Array.from({ length: totalSlides }).map((_, i) => (
        <div
          key={i}
          className={`w-2 rounded-full ${
            activeIndex === i ? `h-5 ${activeColor}` : `h-2 ${inactiveColor}`
          }`}
        ></div>
      ))}
    </section>
  );
}

export default IndicatorDots;