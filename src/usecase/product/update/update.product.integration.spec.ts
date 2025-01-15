import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test for product update use case", () => {

    let sequelize: Sequelize;
        
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should update a product", async () => {
         const product1 = new Product("123","Product 1", 100)


        const productRepository = new ProductRepository();
        await productRepository.create(product1);
        const product = await productRepository.find("123");
        product.changeName("Product 1 Updated");
        product.changePrice(200);


        const useCase = new UpdateProductUseCase(productRepository);
        const result = await useCase.execute(product);
        expect(result.id).toBe("123");
        expect(result.name).toBe("Product 1 Updated");
        expect(result.price).toBe(200);        
    });              
});