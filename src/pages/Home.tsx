import * as React from "react";

const clipPaths = [
  "[clip-path:polygon(0_0,_0_112.5%,_90%_0)]",
  "[clip-path:polygon(0_0,_-80%_112.5%,_10%_0)]",
  "[clip-path:polygon(0_0,_0_192.5%,_170%_0)]",
];

export function Home() {
  const [clipIndex, setClipIndex] = React.useState(0);

  const handleHeroClick = React.useCallback(() => {
    setClipIndex((prev) => (prev + 1) % clipPaths.length);
  }, []);

  return (
    <div className="content flex flex-1 flex-col p-0">
      <div className="hero_container grid items-center">
        <div
          onClick={handleHeroClick}
          className="hero_img_container relative overflow-hidden rounded-br-xl"
        >
          <img
            src="src/assets/allezHeroColor.webp"
            alt="Bicycle Sketched"
            className={`hero_img_left absolute inset-0 h-full w-full object-cover object-left transition-[clip-path] ${clipPaths[clipIndex]}`}
          />
          <img
            src="src/assets/allezHeroSketch.webp"
            alt="Bicycle Sketched"
            className="h-full w-full object-cover object-left"
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="hero group relative flex gap-4">
<div className="hero_img w-full flex-1 justify-start">
  <img
    src="src/assets/allezHeroColor.webp"
    alt="Bicycle Sketched"
    className={`absolute transition-opacity duration-500 group-hover:opacity-100`}
  />
  <img
    src="src/assets/allezHeroSketch.webp"
    alt="Bicycle Sketched"
    className={`absolute transition-opacity duration-500 group-hover:opacity-0`}
  />
</div>
<div className="hero_text absolute top-0 left-0 text-nowrap select-none">
  <h1 className="text-secondary text-sm font-stretch-expanded">
    component compatibility ...
  </h1>
  <h1 className="text-4xl font-extrabold font-stretch-ultra-expanded">
    sorted.
  </h1>
</div>
</div> */
}
