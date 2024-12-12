interface BreakpointOptions {
    [x: string]: any;
    slidesPerView: number | 'auto';
    spaceBetween?: number;
    loop?: boolean;
    navigation?: boolean;
    roundLengths: boolean;
    pagination: {
      el: string;
      clickable: boolean;
    };
    breakpoints: { [key: number]: BreakpointOptions }; 

  }
  
  interface SlideOptions {
    slidesPerView: number | 'auto';
    spaceBetween?: number;
    loop: boolean;
    roundLengths: boolean;
    pagination: {
      el: string;
      clickable: boolean;
    };
    breakpoints?: { [key: number]: BreakpointOptions }; // Index signature
  }
  
  const createSlideOptions = (breakpoints: BreakpointOptions[] = []): SlideOptions => {
    const defaultOptions: SlideOptions = {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      roundLengths: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {}, // Initialize breakpoints object
    };
  
    const options: SlideOptions = breakpoints.reduce((acc, breakpoint) => {
      const { width, ...breakpointOptions } = breakpoint;
      if (!acc.breakpoints) acc.breakpoints = {}; // Ensure breakpoints object is defined
      acc.breakpoints[width] = breakpointOptions;
      return acc;
    }, { ...defaultOptions });
  
    return options;
  };
  
  export default createSlideOptions;
  