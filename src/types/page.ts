export interface IPage {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    slug: string;
    content: string;
    status: string;
    featuredImage?: string;
}