import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";
export default class CustomerRepository implements CustomerRepositoryInterface{
    
    async create(item: Customer): Promise<void> {
        
        await CustomerModel.create({
            id: item.id,
            name: item.name,
            active: item.isActive(),
            rewardPoints: item.rewardPoints,
            street: item.Address.street,
            number: item.Address.number,
            zipcode: item.Address.zip,
            city: item.Address.city
        });
    }

    async update(item: Customer): Promise<void> {        
        await CustomerModel.update({
            name: item.name,
            active: item.isActive(),
            rewardPoints: item.rewardPoints,
            street: item.Address.street,
            number: item.Address.number,
            zipcode: item.Address.zip,
            city: item.Address.city
        }, {where: {id: item.id}});
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({where: {id: id}});
        if (!customerModel) {
            throw new Error("Customer not found");
        }        
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.changeAddress(new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number));        
        return customer;
    }
    async findAll(): Promise<Customer[]> {

        const customerModels = await CustomerModel.findAll();

        const customers = customerModels.map((customerModel) => {
            let customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints); 
            const address = new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number);
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    }
    


}