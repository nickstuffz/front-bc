import { MainContent } from "@/pages/MainContent.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SelectedCodesProvider } from "@/components/SelectedCodesContext";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SelectedCodesProvider>
          <div className="overscroll-none antialiased">
            <SidebarProvider>
              <AppSidebar />
              <main className="bg-background relative flex w-full flex-col">
                <SiteHeader />
                <MainContent />
              </main>
            </SidebarProvider>
          </div>
        </SelectedCodesProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
