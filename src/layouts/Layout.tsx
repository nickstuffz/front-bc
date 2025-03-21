import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SiteHeader from "@/components/SiteHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <SiteHeader />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
