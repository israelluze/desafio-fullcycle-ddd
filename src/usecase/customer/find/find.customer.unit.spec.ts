import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Unit Test find customer use case", () => { 

    const customer = new Customer("123","John");
    const address = new Address("Street","City","Zip",123);
    customer.changeAddress(address);

    const MockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });

    it("Should find a customer", async() => {

        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = { id: "123" };

        const output = { id: "123", 
            name: "John", 
            address: { 
                street: "Street", 
                city: "City", 
                number: 123, 
                zip: "Zip" } 
            };

         const result = await useCase.execute(input);

        expect(result).toEqual(output);

   });

   it("Should not find a customer   ", async() => {
    
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const useCase = new FindCustomerUseCase(customerRepository);
    
        const input = { id: "123" };
    
        expect(()=>{
            return useCase.execute(input);

        }).rejects.toThrow("Customer not found")
    });

});