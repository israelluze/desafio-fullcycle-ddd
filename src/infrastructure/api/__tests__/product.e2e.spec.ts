import {app, sequelize} from '../express';
import request from 'supertest';
describe("E2E test for Product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "product one",
                price: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("product one");
        expect(response.body.price).toBe(10);

    });

    it("should return 500 when an error occurs", async () => {
        const response = await request(app)
            .post("/product")
            .send({                
                name: "product one",
                price: 10
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "product one",
                price: 10
            });

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "b",
                name: "product two",
                price: 20
            });

        const response3 = await request(app)
            .get("/product")
            .send();

        expect(response3.status).toBe(200);
        expect(response3.body.products.length).toBe(2);
    });


});