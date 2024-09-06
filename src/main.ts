import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("Baker Street", "London", "NW1", 221);
customer.Address = address;
customer.activate();

// let order_item = new OrderItem("1", "Item 1", 10);
// let order_item2 = new OrderItem("2", "Item 2", 20);
// let order = new Order("1", "123", [order_item, order_item2]);