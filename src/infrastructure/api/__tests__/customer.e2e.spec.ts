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
            .post("/customers")
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
});