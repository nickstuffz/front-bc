import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "wouter";
import { Home, Cog, BookOpenText, Info, Settings } from "lucide-react";

const topItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Compatibility",
    url: "/compatibility",
    icon: Cog,
  },
  {
    title: "User Guide",
    url: "/guide",
    icon: BookOpenText,
  },
];

const botItems = [
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }) {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar
      collapsible="offcanvas"
      variant="floating"
      className="z-20"
      {...props}
    >
      <p className="text-muted-foreground absolute top-2 right-2 hidden text-xs md:block">
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded-bl border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-sm">⌘</span>B
        </kbd>
      </p>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-2 mb-1">Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="py-5"
                      onClick={() => setOpenMobile(false)}
                      to={item.url}
                    >
                      <item.icon className="mr-1" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {botItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="py-5"
                      onClick={() => setOpenMobile(false)}
                      to={item.url}
                    >
                      <item.icon className="mr-1" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-1 flex flex-row items-end justify-between select-none">
        <small className="text-[0.74rem] font-extralight">
          created by stuffz
        </small>
        <small className="text-[0.64rem] font-extralight">v1.0</small>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
