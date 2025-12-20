import React from "react";
import AdminSideBar from "../../components/ui/Admin/AdminGeneral/AdminSideBar";
import AdminNavbar from "../../components/ui/Admin/AdminGeneral/AdminNavbar";
import { SidebarProvider } from "../../components/ui/Admin/Sidebar/sidebar";
import { cookies } from "next/headers";
import { ThemeProvider } from "../../provider";

export default async function AdminLayout({
  children: hello,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminSideBar />
        <main className="w-full">
          <AdminNavbar />
          <div className="px-4">{hello}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
