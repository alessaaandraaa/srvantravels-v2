"use client"

import { ArrowBigUpDash, LogOut, Moon, SettingsIcon, Sun, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/Admin/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/Admin/dropdown-menu"
import { Button } from "../../../../../components/ui/Admin/button";
import { useTheme } from "next-themes";
import { SidebarTrigger} from "../Sidebar/sidebar";

const AdminNavbar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <nav className="p-4 flex items-center justify-between">
            {/*LEFT*/}
            <SidebarTrigger/>
            {/*RIGHT*/}

            <div className="flex items-center gap-4">
                <Link href="/">Dashboard</Link>
                {/*Theme Menu*/}
                <DropdownMenu>
                    {/* <ArrowBigUpDash/> */}
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={10}>
                        <DropdownMenuItem onClick={() => setTheme("white")}>
                        Main Theme
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/*User Menu*/}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>SYD</AvatarFallback>
                            <span className="sr-only">Open Menu</span>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <User className="h-{1.2rem} w-{1.2rem} mr-2"/>Profile
                            <span className="sr-only">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SettingsIcon className="h-{1.2rem} w-{1.2rem} mr-2"/>Settings
                            <span className="sr-only">Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <LogOut className="h-{1.2rem} w-{1.2rem} mr-2"/>Log Out
                            <span className="sr-only">Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export default AdminNavbar; 