import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
