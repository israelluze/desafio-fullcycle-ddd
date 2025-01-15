import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test List Products", ()=> {

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
       
       it("should return a list of products", async () => {

            const product1 = new Product("123","Product 1", 100)
            const product2 = new Product("456","Product 2", 200);
            const product3 = new Product("789","Product 3", 300);

            const productRepository = new ProductRepository();
            await productRepository.create(product1);
            await productRepository.create(product2);
            await productRepository.create(product3);

            const useCase = new ListProductUseCase(productRepository);
            const result = await useCase.execute({});
            expect(result.products.length).toBe(3);
            expect(result.products[0].id).toBe("123");
            expect(result.products[0].name).toBe("Product 1");
            expect(result.products[0].price).toBe(100);
            expect(result.products[1].id).toBe("456");
            expect(result.products[1].name).toBe("Product 2");
            expect(result.products[1].price).toBe(200);
            expect(result.products[2].id).toBe("789");
            expect(result.products[2].name).toBe("Product 3");
            expect(result.products[2].price).toBe(300);
          });

});

