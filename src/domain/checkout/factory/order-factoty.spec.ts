import { v4 as uuid } from "uuid";
import OrderFactory from "./order-factory";

describe("Order Factoty Unit Test", () => {


    it("should create a valid order", () => {
        const orderProps = {
            id: uuid(),
            customer: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100,
                }
            ]
        };

        const order = OrderFactory.create(orderProps);
        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customer);
        expect(order.items.length).toBe(1);
    });

    it("should create an order with items", () => {
        
    });

    it("should calculate the total amount of the order", () => {
        
    });

});