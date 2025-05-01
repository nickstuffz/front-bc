import { Badge } from "@/components/ui/badge";

export function Guide() {
  return (
    <div className="content mb-4 flex flex-1 flex-col gap-4 p-2">
      <h2 className="pb-3 pl-1">Component Codes</h2>
      <div className="flex flex-col gap-4">
        <p>
          Shimano product codes are marked on the product itself. Characters
          before the first dash denote the category of the product. The group of
          characters after the first dash denote the product's series and serve
          as its main identifier. Characters after a second dash denote
          additional traits of the product.
        </p>
        <div className="flex flex-col gap-3">
          <Badge className="hover:bg-primary/90 pb-1.3 flex h-7 items-center justify-between gap-1 pr-1 pl-1">
            RD-R8000-GS
          </Badge>
          <small className="text-nowrap">
            RD: Rear Derailleur
            <br />
            R8000: Ultegra 11spd Road Groupset (R8000 Series)
            <br />
            GS: Medium Cage (Grand Sport)
          </small>
        </div>
      </div>
      <h2 className="pb-3 pl-1">Compatibility Set</h2>
      <div className="flex flex-col gap-4">
        <p>
          BikePartZ filters to reveal components that are compatible with a
          particular set of component codes,{" "}
          <b className="font-bold text-nowrap">Selected Codes</b>.
        </p>
        <p className="font-extrabold">
          Displayed codes in a Compatibility Option are not necessarily all
          compatible with each other. They are compatible with your Selected
          Codes.
        </p>
        <p>
          Continue selecting component codes in order to filter down your{" "}
          <b className="font-bold text-nowrap">Compatibility Option</b> group
          and build your own compatibility set.
        </p>
        <p>
          Some codes may have an active link! Some codes may also be expanded to
          view relevant notes specific to a code in its particular{" "}
          <b className="font-bold text-nowrap">Compatibility Option</b> group.
        </p>
      </div>
      <h2 className="pb-3 pl-1">Data Source</h2>
      <div className="flex flex-col gap-4">
        <p>BikePartZ current data:</p>
        <div className="flex flex-col gap-0">
          <h4>Shimano Compatibility </h4>
          <h6 className="font-light">2024-2025 ver. 3.0</h6>
        </div>
        <p>
          Component compatibility information is sourced from Shimano's official
          products compatibility information PDFs. Shimano releases new versions
          throughout the year.
        </p>

        <p className="font-extrabold">
          New releases are not automatically added to BikePartZ.
        </p>

        <p>
          While we strive for accuracy, edge cases exist, and errors can happen.
          It is recommended to verify with manufacturer documentation.
        </p>
        <a
          className="underline"
          href="https://productinfo.shimano.com/en/compatibility"
          target="_blank"
          rel="noreferrer"
        >
          https://productinfo.shimano.com/en/compatibility
        </a>
      </div>
    </div>
  );
}
