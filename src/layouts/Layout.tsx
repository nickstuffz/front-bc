import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background overscroll-none antialiased">
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="bg-background relative flex w-full flex-1 flex-col">
            <SiteHeader />
            {children}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
