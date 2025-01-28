import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {

    const useCase = new CreateProductUseCase(new ProductRepository());

    try{
        
        const input = { 
            type: req.body.type, 
            name: req.body.name, 
            price: req.body.price
         };

        const output = await useCase.execute(input);

        res.status(200).json(output);
    }   
    catch (error) {
        res.status(500).send({error});
    }

});

productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    const output = await useCase.execute({});
    res.status(200).send(output);
});