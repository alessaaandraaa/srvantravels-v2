import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupAction, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuBadge, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubButton, 
  SidebarMenuSubItem, 
  SidebarSeparator} from "../Sidebar/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import { Home, Inbox, Calendar, User2, ChevronUp, Settings2Icon, ShipWheel, LogOut, Plus, Projector, ChevronDown, TruckElectric } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Bookings",
    url: "/admin/bookings/pending",
    icon: TruckElectric,
  },
  {
    title: "Monthly Summary",
    url: "/admin/summary",
    icon: Calendar,
  },
]

const AdminSideBar = () => {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/profile">
                  <Image src="/FlinsEmo.jpg" alt="GAY" width={20} height={20}/>
                  <span>Mikoro Leonardo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator/>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Applications</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item)=>(
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {/* Good For Notifications */}
                                {item.title === "Inbox" && (
                                  <SidebarMenuBadge>29</SidebarMenuBadge>
                                )}
                                {item.title === "Bookings" && (
                                  <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                      <SidebarMenuSubButton asChild>
                                        <Link href="/admin/bookings/pending">
                                          <Plus/> Pending
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                      <SidebarMenuSubButton asChild>
                                        <Link href="/admin/bookings/management">
                                          <Plus/> Approve
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup> 
            <SidebarGroup>
              <SidebarGroupLabel>Itineraries</SidebarGroupLabel>
              <SidebarGroupAction>
                {/* Good for Adding a Package or Sorting Data | Shortcut to Projects Page*/}
                <span className="sr-only">Add Itinerary</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/itinerary">
                        <Projector/> See All Itineraries
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/itinerary?add=true">
                        <Plus/> Add Itinerary
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Locations</SidebarGroupLabel>
              <SidebarGroupAction>
                {/* Good for Adding a Package or Sorting Data | Shortcut to Projects Page*/}
                <span className="sr-only">Add Locations</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/locations">
                        <Projector/> See All Locations
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* Collapsible */}
            {/* <Collapsible defaultOpen className="group/collapsible">       
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    Locations
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <CollapsibleContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="/">
                            <Projector/> See All Locations
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="/">
                            <Plus/> Add Location
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarGroupContent>
              </SidebarGroup> */}
            {/* </Collapsible>    */}
            {/* NESTED */}
            {/* <SidebarGroup>
              <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <Projector/> See All Packages
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>  
                      <SidebarMenuSubItem>
                         <SidebarMenuSubButton asChild>
                          <Link href="/">
                            <Plus/> Add Project
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>  */}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2/> Flins Varka <ChevronUp className="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                    <ShipWheel/> Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings2Icon/> Setting
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <LogOut/> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
}

export default AdminSideBar;