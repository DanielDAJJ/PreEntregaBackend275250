import { Router } from 'express';
import { productDao } from '../dao/mongoDao/products.dao.js';
import { productModel } from '../dao/models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const { limit, page, sort, category, status } = req.query;
    try {
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === 'asc' ? 1 : -1,
            },
            category: category,
            lean: true,
        };
        if (status){
            const products = await productDao.getAll({status: status}, options);
            return res.json({status: 'ok', payload: products});
        };
        const products = await productDao.getAll({},options);
        res.json({status: 'ok', payload: products});
    } catch (error) {
        console.log(error);
        res.send(error.message);
    };
});
router.get('/:pid', async (req, res)=>{
    const { pid } = req.params;
    try {
        const product = await productDao.getById(pid);
        if(!product) return res.send({status: "error", message: `producto ${pid} no encontrado`});
        res.json({status: "ok", payload: product});
    } catch (error) {
        console.log(error);
        res.send(error.message);
    };
});
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const product = await productDao.create(body);
        res.status(201).json({status: "ok", payload: product});
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }    
});
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const body = req.body;
    try {
        const findProduct = await productDao.getById(pid);
        if(!findProduct) return res.send({status: "error", message: `Producto ${pid} no encontrado`});
        const updatedProduct = await productDao.updateById(pid, body);
        res.json({status: "ok", payload: updatedProduct});
    } catch (error) {
        console.log(error);
        res.send(error.message);
    };
});
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const findProduct = await productDao.getById(pid);
        if(!findProduct) return res.send({status: "error", message: `Producto ${pid} no encontrado`});
        const product = await productDao.deleteById(pid);
        res.json({status: "ok", payload: product});
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

export default router;
