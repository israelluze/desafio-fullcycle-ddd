import Address from "../value-object/address";
import CustomerFactory from "./customer-factory";

describe("Customer Factoty Unit Test", () => {    
    
    it("should create a valid customer", () => {
        const customer = CustomerFactory.create("John Doe");
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");       
        expect(customer.Address).toBeUndefined(); 
    });

    it("should create a customer with an address", () => {
    const address = new Address("123 Main St", "Springfield", "89000-000",90);
    const customer = CustomerFactory.createWithAddress("John Doe", address);
    });

});
