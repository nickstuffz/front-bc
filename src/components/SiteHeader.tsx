import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/Spinner";
import { useSpinnerState } from "@/lib/spinnerUtils";

export function SiteHeader() {
  // const spinnerActive = useSpinnerState();
  const spinnerActive = false;

  return (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex h-14 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1.5" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div id="logo">Bicycle Compatibility</div>
      </div>
      <div className="flex h-14 items-center gap-3 px-4">
        <Spinner isActive={spinnerActive} />
        <ModeToggle />
      </div>
    </header>
  );
}
