import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product",
    price: 10    
};

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit Test create Product Use Case", () => {
    it("should create a product", async() => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an erro when name is missing", async() => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.name = "";
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });
});