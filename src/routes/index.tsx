import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import { ERouter } from "@/enums/route";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import NotFound from "@/pages/NotFound";
import Overview from "@/pages/dashboard/Overview";
import UserManagement from "@/pages/dashboard/UserManagement";
import CategoryManagement from "@/pages/dashboard/CategoryManagement";
import ProductManagement from "@/pages/dashboard/ProductManagement";
import DocumentManagement from "@/pages/dashboard/DocumentManagement";
import ContentPages from "@/pages/dashboard/ContentPages";
import Settings from "@/pages/dashboard/Settings";

export const route = createBrowserRouter([
    {
        path: ERouter.LOGIN,
        element: <Login />,
    },
    {
        element: <AuthRoute />,
        children: [
            {
                path: ERouter.DASHBOARD,
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        path: ERouter.DASHBOARD_OVERVIEW,
                        element: <Overview />,
                    },
                    {
                        path: ERouter.DASHBOARD_USERS,
                        element: <UserManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_USER_ID,
                        element: <UserManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_CATEGORIES,
                        element: <CategoryManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_CATEGORY_ID,
                        element: <CategoryManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_PRODUCTS,
                        element: <ProductManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_DOCUMENTS,
                        element: <DocumentManagement />,
                    },
                    {
                        path: ERouter.DASHBOARD_CONTENT_PAGES,
                        element: <ContentPages />,
                    },
                    {
                        path: ERouter.DASHBOARD_SETTINGS,
                        element: <Settings />,
                    },
                ]
            },
        ]
    },
    {
        path: ERouter.NOTFOUND,
        element: <NotFound />,
    }
]);