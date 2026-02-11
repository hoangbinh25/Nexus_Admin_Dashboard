import { createRootRoute, createRoute, createRouter, Navigate } from '@tanstack/react-router';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import { ERouter } from "@/enums/route";
import { AuthRoute } from "@/components/AuthRoute";
import NotFound from "@/pages/NotFound";
import Overview from "@/pages/dashboard/Overview";
import UserManagement from "@/pages/dashboard/UserManagement";
import CategoryManagement from "@/pages/dashboard/CategoryManagement";
import ProductManagement from "@/pages/dashboard/ProductManagement";
import DocumentManagement from "@/pages/dashboard/DocumentManagement";
import ContentPages from "@/pages/dashboard/ContentPages";
import Settings from "@/pages/dashboard/Settings";

// Root Route
const rootRoute = createRootRoute({
    component: () => (
        <>
            <AuthRoute />
        </>
    ),
});

// Login Route
const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ERouter.LOGIN,
    component: Login,
});

// Dashboard Route (Parent)
const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ERouter.DASHBOARD,
    component: DashboardLayout,
});

// Overview Route
const overviewRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'overview',
    component: Overview,
});

// User Management Routes
const usersRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'users',
    component: UserManagement,
});

const userDetailRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'users/$userId',
    component: UserManagement,
});

// Category Management Routes
const categoriesRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'categories',
    component: CategoryManagement,
});

const categoryDetailRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'categories/$categoryId',
    component: CategoryManagement,
});

// Other Dashboard Routes
const productsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'products',
    component: ProductManagement,
});

const documentsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'documents',
    component: DocumentManagement,
});

const contentPagesRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'content-pages',
    component: ContentPages,
});

const settingsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: 'settings',
    component: Settings,
});

const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: () => <Navigate to={`${ERouter.DASHBOARD_OVERVIEW}`} />,
})

// Root index redirect to Dashboard
const rootIndexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Navigate to={`${ERouter.DASHBOARD_OVERVIEW}`} />,
})

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFound,
});

// Route Tree
const routeTree = rootRoute.addChildren([
    rootIndexRoute,
    loginRoute,
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        overviewRoute,
        usersRoute,
        userDetailRoute,
        categoriesRoute,
        categoryDetailRoute,
        productsRoute,
        documentsRoute,
        contentPagesRoute,
        settingsRoute,
    ]),
    notFoundRoute,
]);

// Create Router
export const router = createRouter({ routeTree });

// Register for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
