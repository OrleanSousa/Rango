type SlideContentProps = {
    title: string;
    description: string;
  };
  
  function SlideContent({ title, description }: SlideContentProps) {
    return (
      <section className="p-5 h-[215px]">
        <div className="px-[20px] py-[10%] rounded-lg bg-white text-center">
          <h1 className="text-[28px] font-bold capitalize mb-5">{title}</h1>
          <p className="text-[16px]">{description}</p>
        </div>
      </section>
    );
  }
  
  export default SlideContent;
  