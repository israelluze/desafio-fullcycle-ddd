import Customer from "../../customer/entity/customer";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/send-console-log-when-customer-address-is-changed.handler";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log2-when-customer-is-created.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
            
    });

    it("should unregister an event handler", ()=> {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);


    });

    it("should unregister all event handlers", ()=>{

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers ", ()=> {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new SendEmailWhenProductIsCreatedHandler();
       const spyEventHandler = jest.spyOn(eventHandler, "handle");

       eventDispatcher.register("ProductCreatedEvent", eventHandler);

       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

       const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Description",
            price: 10.0,
       });

       // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
       eventDispatcher.notify(productCreatedEvent);

       expect(spyEventHandler).toHaveBeenCalled();      
    }); 
        
    it("should notify all event handlers when a Customer is created", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");        
 
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);     
        
        const address = new Address("Street 1", "City", "State", 89200);
 
        const customerCreatedEvent = new CustomerCreatedEvent({
             id: "123",
             name: "Customer", 
             address: address                         
        }); 
        
        eventDispatcher.notify(customerCreatedEvent);
 
        expect(spyEventHandler).toHaveBeenCalled();      
     });

     it("should notify all event handlers when a Customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const customer = new Customer("123", "John Doe", eventDispatcher);
        const address = new Address("Street 1", "City", "State", 89200);

        customer.changeAddress(address);

        expect(spyEventHandler).toHaveBeenCalled();
    });


});
