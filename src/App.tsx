import { MainContent } from "@/pages/MainContent.tsx"; // - Custom
import { Home } from "@/pages/Home.tsx"; // - Custom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Query tools - TanStack
import { ThemeProvider } from "@/providers/ThemeProvider"; // Theme provider - shadCN
import { SpinnerProvider } from "@/providers/SpinnerProvider"; // - Custom
import { SelectedCodesProvider } from "@/providers/SelectedCodesProvider"; // Context-Reducer provider for selected codes - Custom
import { SidebarProvider } from "@/components/ui/sidebar"; // - shadCN
import { AppSidebar } from "@/components/AppSidebar"; // - shadCN / Custom
import { SiteHeader } from "@/components/SiteHeader"; // - shadCN / Custom
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // - Tanstack
import { Route, Switch } from "wouter"; // Wouter

export function App() {
  const queryClient = new QueryClient(); // Create a new query client for TanStack

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SpinnerProvider>
          <SelectedCodesProvider>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <main className="relative flex w-full flex-col">
                <SiteHeader />
                <Switch>
                  <Route path="/" component={Home}></Route>
                  <Route path="/compatibility/" component={MainContent} />
                  <Route path="/guide">User Guide</Route>
                  <Route path="/about">About</Route>
                  <Route path="/settings">Settings</Route>

                  <Route>404 Error, Page Not Found</Route>
                </Switch>
              </main>
            </SidebarProvider>
          </SelectedCodesProvider>
        </SpinnerProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
