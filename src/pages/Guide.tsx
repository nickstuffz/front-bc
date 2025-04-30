import { Badge } from "@/components/ui/badge";

export function Guide() {
  return (
    <div className="content flex flex-1 flex-col gap-4 p-2">
      <h2 className="mb-2 pl-1">Component Codes</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Badge className="hover:bg-primary/90 flex h-7 items-center justify-between gap-1 py-1 pr-1 pl-1.5">
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
        <div className="flex flex-col">
          <Badge className="hover:bg-primary/90 flex h-7 items-center justify-between gap-1 py-1 pr-1 pl-1.5">
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
        <p>
          Shimano product codes are marked on the product itself. Characters
          before the first dash denote the category of the product. Characters
          after the first dash denote the product's group and identifier.
          Characters after a second dash denote additional traits of the
          specific product.
        </p>
      </div>

      <h2 className="mb-2 pl-1">Data Source</h2>
      <div className="flex flex-col gap-4">
        <p>BikePartZ current data:</p>
        <div className="flex flex-col">
          <h4>Shimano Compatibility</h4>
          <h6>2024-2025 ver. 3.0</h6>
        </div>
        <p>
          Component compatibility information is sourced from Shimano's official
          products compatibility information PDFs. Shimano releases new versions
          throughout the year.{" "}
          <b className="font-extrabold">
            New releases are not automatically added to BikePartZ.
          </b>
        </p>
        <p>
          While we strive for accuracy, edge cases exist, and errors can happen.
          Double-check with the official manufacturer documentation for
          certainty.
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
