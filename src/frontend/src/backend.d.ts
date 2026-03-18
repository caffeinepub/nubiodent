import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export type Category = string;
export interface Product {
    id: ProductId;
    featured: boolean;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    rating: number;
    price: number;
}
export interface backendInterface {
    addProduct(name: string, description: string, category: Category, price: number, imageUrl: string, featured: boolean, rating: number, inStock: boolean): Promise<ProductId>;
    addToCart(productId: ProductId, quantity: bigint): Promise<void>;
    addToWishlist(productId: ProductId): Promise<void>;
    clearCart(): Promise<void>;
    deleteProduct(productId: ProductId): Promise<boolean>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(productId: ProductId): Promise<Product | null>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getWishlist(): Promise<Array<ProductId>>;
    initialize(): Promise<boolean>;
    removeFromCart(productId: ProductId): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    updateProduct(productId: ProductId, name: string, description: string, category: Category, price: number, imageUrl: string, featured: boolean, rating: number, inStock: boolean): Promise<boolean>;
}
