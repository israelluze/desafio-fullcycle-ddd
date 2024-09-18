import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/product/entity/product";


describe("Product repositoty test", ()=>{

    let sequelize: Sequelize;
    
    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:'
        });        
    
        sequelize.addModels([ProductModel]);
        await sequelize.sync();        
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("should create a product", async ()=>{
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "123"}});

        expect(productModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 100
        });
    });

    it("should update a product", async ()=>{
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "123"}});

        expect(productModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 100
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({where: {id: "123"}});

        expect(productModel2?.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 2",
            price: 200
        });
    });

    it("should find a product", async ()=>{
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productFound = await productRepository.find("123");

        expect(productFound).toStrictEqual(product);
    });

    it("should find all products", async ()=>{
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const products = await productRepository.findAll();

        expect(products).toStrictEqual([product1, product2]);
    });
});