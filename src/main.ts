import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";
import OrderItem from "./domain/order/entity/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("Baker Street", "London", "NW1", 221);
customer.Address = address;
customer.activate();

// let order_item = new OrderItem("1", "Item 1", 10);
// let order_item2 = new OrderItem("2", "Item 2", 20);
// let order = new Order("1", "123", [order_item, order_item2]);