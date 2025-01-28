import {app, sequelize} from '../express';
import request from 'supertest';
describe("E2E test for Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: "123",
                    zip: "10044"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Main Street");
        expect(response.body.address.city).toBe("New York");
        expect(response.body.address.number).toBe("123");
        expect(response.body.address.zip).toBe("10044");

    });

    it("should return 500 when an error occurs", async () => {
        const response = await request(app)
            .post("/customer")
            .send({                
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: "123",
                    zip: "10044"
                }
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: "123",
                    zip: "10044"
                }
            });
         expect(response.status).toBe(200);
         
         const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Maria Doe",
                address: {
                    street: "Main Street 2",
                    city: "New York 2",
                    number: "123",
                    zip: "10044"
                }
            });
         expect(response2.status).toBe(200);   

         const listResponse = await request(app).get("/customer").send();

         expect(listResponse.status).toBe(200);
         expect(listResponse.body.customers.length).toBe(2);
         const customer = listResponse.body.customers[0];
         expect(customer.name).toBe("John Doe");
         expect(customer.address.street).toBe("Main Street");
         const customer2 = listResponse.body.customers[1];
         expect(customer2.name).toBe("Maria Doe");
         expect(customer2.address.street).toBe("Main Street 2");

    });

});