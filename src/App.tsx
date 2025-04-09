import { MainContent } from "@/pages/MainContent.tsx"; // Main content of app (not sidebar, not header)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Query tools from TanStack
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Devtools for Tanstack
import { ThemeProvider } from "@/components/ThemeProvider"; // Theme provider from shadCN
import { SidebarProvider } from "@/components/ui/sidebar"; // Sidebar provider from shadCN
import { AppSidebar } from "@/components/AppSidebar"; // Sidebar component
import { SiteHeader } from "@/components/SiteHeader"; // Header component
import { SelectedCodesProvider } from "@/components/SelectedCodesProvider"; // Context-Reducer for selected codes

export function App() {
  const queryClient = new QueryClient(); // Create a new query client for TanStack

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
