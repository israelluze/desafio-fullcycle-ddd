import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";

describe("Unit Test find product use case", () => {

    const product = new Product("123", "Product", 100);
    
    const MockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);
        const input = { id: "123" };
        const output = {
            id: "123",
            name: "Product",
            price: 100,            
        };
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
    it("Should not find a product   ", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new FindProductUseCase(productRepository);
        const input = { id: "456" };
        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});