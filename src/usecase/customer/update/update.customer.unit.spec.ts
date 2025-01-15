import CustomerFactory from "../../../domain/customer/factory/customer-factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John Doe', new Address('Main Street', "Orlando", '´zip', 123));

const input = {
    id: customer.id,
    name: 'John Doe Updated',
    address: {
        street: 'Main Street Updated',
        number: 123,
        zip: 'zip',
        city: 'Orlando Updated',
    }
}

const mockRepository = ()=>{
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe('Unit test for customer update use case', () => {
    it('should update a customer', async () => {
        const customerRepository = mockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await updateCustomerUseCase.execute(input);

        expect(output).toEqual(input);
    });
});

