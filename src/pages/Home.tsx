import * as React from "react";

export function Home() {
  const [sketchOn, setSketchOn] = React.useState(true);
  return (
    <div className="content flex flex-1 flex-col gap-4 p-4">
      <div className="hero relative flex gap-4">
        <div
          onClick={() => setSketchOn(!sketchOn)}
          className="hero_img @container absolute top-0 left-0 flex w-full justify-start"
        >
          <img
            src="src/assets/allezHeroSketch.webp"
            alt="Bicycle Sketched"
            className={`absolute rounded-3xl transition-opacity duration-500 ${sketchOn ? "opacity-100" : "opacity-0"}`}
          />
          <img
            src="src/assets/allezHeroColor.webp"
            alt="Bicycle Sketched"
            className={`absolute rounded-3xl transition-opacity duration-500 ${sketchOn ? "opacity-0" : "opacity-100"}`}
          />
        </div>
        <div className="hero_text z-10 flex flex-col gap-4 p-6 text-nowrap select-none">
          <h1 className="text-5xl font-stretch-expanded">
            Bicycle Component Compatibility ...
          </h1>
          <h1 className="text-6xl font-extrabold font-stretch-ultra-expanded">
            sorted.
          </h1>
        </div>
      </div>
    </div>
  );
}
