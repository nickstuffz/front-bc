import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/Spinner";
import { useSpinnerState } from "@/lib/spinnerUtils";
import { Link } from "wouter";

export function SiteHeader() {
  const spinnerActive = useSpinnerState(); // Consume spinner state from context

  return (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center justify-between border-b select-none">
      <div className="flex h-14 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1.5" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div
          id="logo"
          className="2xs:text-base xs:text-lg font-mono text-sm font-semibold"
        >
          <Link to="/">Bike Part Compatibility</Link>
        </div>
      </div>
      <div className="flex h-14 items-center gap-3 pr-4">
        <Spinner isActive={spinnerActive} />
        <ModeToggle />
      </div>
    </header>
  );
}
