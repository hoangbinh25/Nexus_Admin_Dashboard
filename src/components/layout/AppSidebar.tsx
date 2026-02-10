import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Users,
  Layers,
  Box,
  FileText,
  Files,
  Settings,
  LogOut,
} from "lucide-react";
import { ERouter } from "@/enums/route";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { title: "Overview", url: ERouter.DASHBOARD_OVERVIEW, icon: LayoutGrid },
  { title: "User Management", url: ERouter.DASHBOARD_USERS, icon: Users },
  { title: "Category Management", url: ERouter.DASHBOARD_CATEGORIES, icon: Layers },
  { title: "Product Management", url: ERouter.DASHBOARD_PRODUCTS, icon: Box },
  { title: "Document Management", url: ERouter.DASHBOARD_DOCUMENTS, icon: FileText },
  { title: "Content Pages", url: ERouter.DASHBOARD_CONTENT_PAGES, icon: Files },
  { title: "Settings", url: ERouter.DASHBOARD_SETTINGS, icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-72 min-h-screen bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <span className="text-[#0F172A] font-bold text-2xl tracking-tight">Nexus Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.url}>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5]"
                      : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                  )}
                >
                  <item.icon className={cn(
                    "h-6 w-6 shrink-0",
                    isActive ? "text-[#4F46E5]" : "text-[#64748B]"
                  )} />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-[#EF4444] hover:bg-red-50 w-full transition-all duration-200 group"
        >
          <LogOut className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </aside>
  );
}
