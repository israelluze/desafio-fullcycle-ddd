
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";


export default class OrderRepository implements OrderRepositoryInterface {    
    async create(order: Order): Promise<void> {
       await OrderModel.create({
              id: order.id,
              customer_id: order.customerId,
              total: order.total(),
              items: order.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
         },
         {
            include: [{model: OrderItemModel}]
         }
        );        
    }

    async update(order: Order): Promise<void> {      
      try {
        const existingOrder = await OrderModel.findOne({
          where: { id: order.id },
          include: [OrderItemModel]         
        });

        if (!existingOrder) {
          throw new Error("Order not found");
        }

        await OrderModel.update({
          customer_id: order.customerId,
          total: order.total(),
        }, {
          where: { id: order.id }          
        });

        for (const item of order.items) {
          await OrderItemModel.update({
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          }, {
            where: { id: item.id, order_id: order.id },           
          });
        }        
      } catch (error) {        
        throw error;
      }
    }
    
    async find(id: string): Promise<Order> {
      const orderModel = await OrderModel.findOne({
          where: { id },
          include: [OrderItemModel]
      });

      if (!orderModel) {
          throw new Error("Order not found");
      }

      const items = orderModel.items.map((item: any) => {
          return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
      });

      return new Order(orderModel.id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
        include: [OrderItemModel]
    });

    return orderModels.map(orderModel => {
        const items = orderModel.items.map((item: any) => {
            return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
        });

        return new Order(orderModel.id, orderModel.customer_id, items);
    });
}

} 


