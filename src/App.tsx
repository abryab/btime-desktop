import moment from "jalali-moment";
import { useEffect, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { JalaliSlider } from "./sliders/jalali/slider";
import { GregorianSlider } from "./sliders/gregorian/slider";

function App() {
  const [currentTime, setCurrentTime] = useState(moment());
  const [showArrows, setShowArrows] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function onMouseEnter() {
    setShowArrows(!showArrows);
  }

  return (
    <Carousel
      className="rounded-xl"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseEnter}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          onClick={handlePrev}
          className={`!absolute top-2/4 left-4 -translate-y-2/4 ${
            !showArrows && "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <g id="Arrow / Chevron_Right_MD">
              <path
                id="Vector"
                d="M14 16L10 12L14 8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          onClick={handleNext}
          className={`!absolute top-2/4 !right-4 -translate-y-2/4 ${
            !showArrows && "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <g id="Arrow / Chevron_Right_MD">
              <path
                id="Vector"
                d="M10 8L14 12L10 16 12h18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div
          className={`absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 ${
            !showArrows && "hidden"
          }`}
        >
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-gray-600" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <JalaliSlider currentTime={currentTime} />
      <GregorianSlider currentTime={currentTime} />
    </Carousel>
  );
}

export default App;
