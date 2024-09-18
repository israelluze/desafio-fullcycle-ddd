import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Product from "../../../../domain/product/entity/product";
import Customer from "../../../../domain/customer/entity/customer";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderRepository from "./order.repository";

describe("Order repositoty test", ()=>{

    let sequelize: Sequelize;
    
    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });        
    
        await sequelize.addModels([
            CustomerModel, 
            OrderModel, 
            OrderItemModel, 
            ProductModel]);
        await sequelize.sync();        
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("should create order", async ()=>{
       const customerRepository = new CustomerRepository();
       const customer = new Customer("123","Customer 1")
       const address = new Address("123", "Street 1","1123",123);
       customer.changeAddress(address);
       await customerRepository.create(customer);       

       const productRepository = new ProductRepository();
       const product = new Product("123","Product 1", 100);
       await productRepository.create(product);      

       const orderItem = new OrderItem(
              "1",
              product.id,
              product.name,
              product.price,
              2
         );   
         
         const order = new Order("123",customer.id,[orderItem]);        

          const orderRepository = new OrderRepository();
          await orderRepository.create(order);

         const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
          });           
         
          expect(orderModel?.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123"
                },                
            ],
         });
    });

    it("Should update order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");   
        const address = new Address("123", "Street 1", "1123", 123);
        customer.changeAddress(address);    
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );
        
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);              
         
        order.changeItemQuantity(orderItem.id, 3);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });
        
        //conferir valor total da ordem
        expect(orderModel?.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123"
                },                
            ],
         });

    });
    
    it("Should find order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");   
        const address = new Address("123", "Street 1", "1123", 123);
        customer.changeAddress(address);    
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );
        
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);      
        
        const orderFound = await orderRepository.find("123");
        
        expect(orderFound).toStrictEqual(order);

        
    });

    //deve localizar todas as ordens
    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("123", "Street 1", "1123", 123);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );
        
        const order = new Order("456", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);  

        const orderItem2 = new OrderItem(
            "2",
            product.id,
            product.name,
            product.price,
            3
        );
        
        const order2 = new Order("789", customer.id, [orderItem2]);        
        await orderRepository.create(order2);  

        const ordersFound = await orderRepository.findAll();

        expect(ordersFound).toStrictEqual([order, order2]);
    });
});
