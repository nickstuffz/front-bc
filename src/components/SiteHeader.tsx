import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
      <div className="flex h-14 w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1.5" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {/* <NavHeader /> */}
        <div className="ml-auto flex items-center gap-2">
          {/* <ThemeSelector />
              <ModeSwitcher /> */}
        </div>
      </div>
    </header>
  );
}
