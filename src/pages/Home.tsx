import * as React from "react";
import allezHeroColor from "@/assets/allezHeroColor.webp";
import allezHeroSketchNoted from "@/assets/allezHeroSketchNoted.webp";

const clipPaths = [
  "[clip-path:polygon(0_0,_0_112.5%,_90%_0)]",
  "[clip-path:polygon(0_0,_-80%_112.5%,_10%_0)]",
  "[clip-path:polygon(0_0,_0_192.5%,_170%_0)]",
];

export function Home() {
  const [clipIndex, setClipIndex] = React.useState(0); // State for clip path reveal of hero image

  // Handles hero click to advance clip state
  const handleHeroClick = React.useCallback(() => {
    setClipIndex((prev) => (prev + 1) % clipPaths.length);
  }, []);

  // Auto advance of clip state with timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setClipIndex((prev) => (prev + 1) % clipPaths.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content flex flex-1 flex-col p-0 select-none">
      <div className="grid items-center justify-start">
        <div
          onClick={handleHeroClick}
          className="hero_container relative max-w-[1600px] overflow-hidden text-nowrap"
        >
          <div
            className={`left_container absolute inset-0 z-10 w-full transition-[clip-path] duration-800 ${clipPaths[clipIndex]}`}
          >
            <h1 className="xs:text-xl absolute inset-0 top-1 left-1 z-10 text-base text-white font-stretch-ultra-expanded sm:text-2xl md:top-2 md:left-2 md:text-3xl lg:text-4xl xl:text-5xl">
              component compatibility ...
            </h1>
            <h1 className="xs:text-5xl absolute right-1 bottom-1 z-10 text-4xl font-extrabold text-white font-stretch-ultra-expanded sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              ?????
            </h1>
            <img
              src={allezHeroColor}
              alt="Bicycle Sketched"
              className="hero_img_left w-full object-cover object-left"
            />
          </div>
          <div className="right_container w-full">
            <h1 className="xs:text-xl absolute inset-0 top-1 left-1 text-base text-black font-stretch-ultra-expanded sm:text-2xl md:top-2 md:left-2 md:text-3xl lg:text-4xl xl:text-5xl">
              component compatibility ...
            </h1>
            <h1 className="xs:text-5xl absolute right-1 bottom-1 text-4xl font-extrabold text-black font-stretch-ultra-expanded sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              sorted.
            </h1>
            <img
              src={allezHeroSketchNoted}
              alt="Bicycle Sketched"
              className="her_img_right w-full object-cover object-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
