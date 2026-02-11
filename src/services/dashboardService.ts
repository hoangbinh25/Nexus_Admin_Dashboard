import api from "./api";

export const getDashboardStatsService = () => {
    try {
        const response = api.get('/dashboard/stats');
        return response;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
}

export const getLatestProductsService = () => {
    try {
        const response = api.get('/dashboard/latest-products');
        return response;
    } catch (error) {
        console.error('Error fetching latest products:', error);
        throw error;
    }
}

export const getContentStatusService = () => {
    try {
        const response = api.get('/dashboard/content-status');
        return response;
    } catch (error) {
        console.error('Error fetching content status:', error);
        throw error;
    }
}
