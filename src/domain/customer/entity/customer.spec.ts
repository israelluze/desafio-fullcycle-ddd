import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    
    it("should throw erro when id is empty", () => {
        let customer = () => new Customer("", "John");
        expect(customer).toThrow("Id is required");
    });

    it("should throw erro when name is empty", () => {
        let customer = () => new Customer("1231", "");
        expect(customer).toThrow("Name is required");
    });

    it("should change name when name is valid", () => {
        let customer = new Customer("1231", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "John");
        const address = new Address("Baker Street", "London", "NW1", 221);
        customer.Address = address;

        customer.activate()

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined in activate customer", () => {              
        expect(() => {
            const customer = new Customer("1", "John");
            customer.activate()
        }).toThrow("Address is mandatory to activate a customers");

    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "John");               

        customer.deactivate()
        
        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});