import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "wouter";

const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Compatibility",
    url: "/compatibility",
  },
  {
    title: "User Guide",
    url: "#",
  },
  {
    title: "About",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Test</SidebarFooter>
    </Sidebar>
  );
}
