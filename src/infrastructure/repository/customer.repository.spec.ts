import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";


describe("Customer repositoty test", ()=>{

    let sequelize: Sequelize;
    
    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:'
        });        
    
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();        
    });

    afterEach(async ()=>{
        await sequelize.close();
    });
    
    it("should create a customer", async ()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John"); 
        const address = new Address("Baker Street", "London", "NW1", 221);
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John");
        const address = new Address("Baker Street", "London", "NW1", 221);
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("John Doe");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });        
    });

    it("should find a customer", async ()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John");
        const address = new Address("Street 1", "City 1", "12345", 1);
        customer.Address = address;
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("1");        

        expect(customer).toStrictEqual(foundCustomer);
    });

    it("should throw an error when customer not found", async ()=>{
        const customerRepository = new CustomerRepository();
        await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
          //should find all customers
            const customerRepository = new CustomerRepository();
            const customer1 = new Customer("1", "John");
            const address1 = new Address("Street 1", "City 1", "12345", 1);
            customer1.Address = address1;
            await customerRepository.create(customer1);
            const customer2 = new Customer("2", "Jane");
            const address2 = new Address("Street 2", "City 2", "54321", 2);
            customer2.Address = address2;
            await customerRepository.create(customer2);

            const customers = await customerRepository.findAll();
            expect(customers).toStrictEqual([customer1, customer2]);
        });





});