import { ICategory } from "./category";

export interface IProduct {
    id: string;
    sku: string;
    name: string;
    brand: string;
    category: ICategory;
    basePrice: number;
    discountPrice: number;
    stockUnits: number;
    status: string;
    isFeatured: boolean;
    mainImage: string;
    createdAt: string;
}