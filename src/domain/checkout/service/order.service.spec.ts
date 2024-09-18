
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order service unit tests", () =>{


    it("should place an order", () =>{

        const customer = new Customer("1", "John");
        const orderItem = new OrderItem("1", "prod1", "desc1", 100, 2);
        
        const order = OrderService.placeOrder(customer, [orderItem]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);

        
    })

    it("should get total off all orders", () =>{

        const orderItem = new OrderItem("1", "prod1", "desc1", 100, 2);
        const orderItem2 = new OrderItem("2", "prod2", "desc2", 200, 3);

        const order = new Order("1", "123", [orderItem]);
        const order2 = new Order("2", "123", [orderItem2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(800);


    })


})