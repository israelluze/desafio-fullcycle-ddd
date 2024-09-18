import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items are required");
    });

    it("should calculate total", () => {
        expect(() => {
            const item1 = new OrderItem("1","Prod 1", "Item 1", 100, 2);
            const item2 = new OrderItem("2","Prod 2", "Item 2", 200, 3);
            const order = new Order("123", "123", [item1, item2]);
            expect(order.total).toBe(700);
        });
    });
       
});

    
