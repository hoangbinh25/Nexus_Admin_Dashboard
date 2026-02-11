export interface IStatsResponse {
    totalUsers: number;
    totalProducts: number;
    totalCategories: number;
    publishedPages: number;
    draftPages: number;
    totalDocuments: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    featuredProducts: number;
}

export interface ILastestProductsResponse {
    id: string;
    name: string;
    sku: string;
    basePrice: number;
    mainImage: string;
    createdAt: string;
}

export interface IContentStatusResponse {
    id: string;
    title: string;
    action: string;
    createdAt: string;
    updatedAt: string;
}