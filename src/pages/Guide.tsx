import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  SquareArrowOutUpRight,
  Maximize,
  Minimize,
  Anchor,
  Cat,
} from "lucide-react";

export function Guide() {
  const [isExpanded, setIsExpanded] = React.useState(false); // Basic state for expanded/collapsed state
  return (
    <div className="content mb-4 flex max-w-[1600px] flex-1 flex-col gap-4 border-r p-2">
      <h1 className="w-4/5 rounded-br-lg border-r border-b pb-3 pl-1">
        User Guide
      </h1>
      <div className="flex flex-col items-start gap-4">
        <p>
          BikeCompatZ filters data to display component codes that are
          compatible with your chosen set of component codes, named{" "}
          <b className="font-bold text-nowrap">Selected Codes</b>.
        </p>
        <p>
          Displayed codes are grouped into{" "}
          <b className="font-bold text-nowrap">Compatibility Options</b>
        </p>
        <div className="bg-secondary text-secondary-foreground relative right-2 flex flex-col items-start gap-3 rounded-r-lg p-4 md:pl-6">
          <p className="font-extrabold">
            All displayed codes are compatible with every code in your Selected
            Codes set.
          </p>
        </div>
        <p>
          Select your first component code. <Anchor className="inline size-4" />
        </p>
        <p>
          Continue selecting component codes to filter down your{" "}
          <b className="font-bold text-nowrap">Compatibility Option</b> groups
          and refine your own compatibility set.
        </p>
        <div className="bg-secondary text-secondary-foreground relative right-2 flex items-center gap-3 rounded-r-lg p-4 md:pl-6">
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Kitten"
            rel="noreferrer"
            className=""
          >
            <SquareArrowOutUpRight className="size-6" />
          </a>
          <p className="flex-1">Some codes have a product page link.</p>
        </div>
        <div className="bg-secondary text-secondary-foreground relative right-2 flex items-start gap-3 rounded-r-lg p-4 md:pl-6">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <Minimize className="size-6" />
            ) : (
              <Maximize className="size-6" />
            )}
          </button>
          <div className="flex flex-1 flex-col gap-2">
            <p>
              Some codes have relevant notes specific to a code in its
              particular{" "}
              <b className="font-bold text-nowrap">Compatibility Option</b>{" "}
              group. If so, the code can be expanded to reveal them.
            </p>
            {isExpanded && (
              <>
                <Cat />
                <small>
                  <em>meow !</em>
                </small>
              </>
            )}
          </div>
        </div>
      </div>
      <h2 className="pb-3 pl-1">Component Codes</h2>
      <div className="flex flex-col items-start gap-4">
        <p>
          Shimano product codes are marked on the product itself. Characters
          before the first dash denote the category of the product. The group of
          characters after the first dash denotes the product's series and
          serves as its main identifier. Characters after a second dash denote
          additional traits of the product.
        </p>
        <div className="bg-secondary text-secondary-foreground relative right-2 flex flex-col items-start gap-3 rounded-r-lg p-4 md:pl-6">
          <Badge className="hover:bg-primary/90 flex h-7 items-center justify-start gap-0 py-1 pr-1 pl-1">
            RD-R8000-GS
          </Badge>
          <small className="">
            RD: Rear Derailleur
            <br />
            R8000: ULTEGRA 11spd (R8000 Series)
            <br />
            GS: Grand Sport (Medium Cage)
          </small>
        </div>
      </div>

      <h2 className="pb-3 pl-1">Data Source</h2>
      <div className="flex flex-col items-start gap-4">
        <p>BikeCompatZ current data:</p>
        <div className="bg-secondary text-secondary-foreground relative right-2 flex flex-col items-start rounded-r-lg p-4 md:pl-6">
          <h4>Shimano Compatibility </h4>
          <h6 className="font-light">2024-2025 ver. 3.0</h6>
        </div>
        <p>
          Component compatibility data is sourced from Shimano's official
          products compatibility information PDFs. Shimano releases new versions
          throughout the year.
        </p>

        <p className="font-extrabold">
          New releases are not automatically added to BikeCompatZ.
        </p>

        <p>
          While I strive for accuracy, mistakes can happen. It is recommended to
          verify with manufacturer documentation before a purchasing decision.
        </p>
        <a
          className="underline"
          href="https://productinfo.shimano.com/en/compatibility"
          target="_blank"
          rel="noreferrer"
        >
          Shimano Compatibility =&gt;
        </a>
      </div>
    </div>
  );
}
