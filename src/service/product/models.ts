export abstract class ProductService {
	abstract list: () => Promise<Product[]>;
}

export type Product = {
	productName: string;
	productQnty: string;
};
