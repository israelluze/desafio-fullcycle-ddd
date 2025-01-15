import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {

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

   it("Should create a product", async() => {

        const product = new Product("123","Product 1", 100);
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input = { type: "a", id: "123", name: "Product 1", price: 100 };
        const output = { id: "123", name: "Product 1", price: 100 };

        const result = await useCase.execute(input);
        console.log(result);
        expect(result.name).toBe(output.name);
        expect(result.price).toBe(output.price);

   });


});