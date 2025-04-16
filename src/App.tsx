import { MainContent } from "@/pages/MainContent.tsx"; // - Custom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Query tools - TanStack
import { ThemeProvider } from "@/components/ThemeProvider"; // Theme provider - shadCN
import { SpinnerProvider } from "@/components/SpinnerProvider"; // - Custom
import { SelectedCodesProvider } from "@/components/SelectedCodesProvider"; // Context-Reducer provider for selected codes - Custom
import { SidebarProvider } from "@/components/ui/sidebar"; // - shadCN
import { AppSidebar } from "@/components/AppSidebar"; // - shadCN / Custom
import { SiteHeader } from "@/components/SiteHeader"; // - shadCN / Custom
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // - Tanstack

export function App() {
  const queryClient = new QueryClient(); // Create a new query client for TanStack

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SpinnerProvider>
          <SelectedCodesProvider>
            <div className="text-primary bg-background overscroll-none antialiased">
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <main className="relative flex w-full flex-col">
                  <SiteHeader />
                  <MainContent />
                </main>
              </SidebarProvider>
            </div>
          </SelectedCodesProvider>
        </SpinnerProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
