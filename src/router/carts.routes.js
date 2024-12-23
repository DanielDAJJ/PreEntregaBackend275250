import { Router } from 'express';
import { cartModel } from '../dao/models/cart.model.js';
import { productModel } from '../dao/models/product.model.js';
import { productDao } from '../dao/mongoDao/products.dao.js';
import { cartDao } from '../dao/mongoDao/carts.dao.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await cartDao.getAll()
        res.json({ status: 'ok', payload: carts });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).send({ message: 'Cart not found' });
        res.json({ status: 'ok', payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const newCart = await cartDao.create({});
        res.json({ status: 'ok', payload: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const findProduct = await productModel.findById(pid);
        if(!findProduct) return res.status(404).send({ message: 'Product not found' });
        const findCart = await cartModel.findById(cid);
        if(!findCart) return res.status(404).send({ message: 'Cart not found' });
        const product = findCart.products.find((productCart)=> productCart.product === pid);
        if(!product){
            findCart.products.push({ product: pid, quantity: 1 });
        } else {
            product.quantity ++;
        };
        const updatedCart = await cartDao.update(cid, {products: findCart.products}, { new: true });
        res.json({ status: 'ok', payload: updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const product = await productDao.getById(pid);
        if(!product) return res.status(404).send({ message: `Product ${pid} not found` });
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).send({ message: `Cart ${cid}not found` });
        const cartUpdate = await cartDao.deleteProductInCart(cid, pid);
        res.json({ status: 'ok', payload: cartUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const product = await productDao.getById(pid);
        if(!product) return res.status(404).send({ message: `Product ${pid} not found` });
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).send({ message: `Cart ${cid} not found` });
        const cartUpdate = await cartDao.updateProductInCart(cid, pid, quantity);
        res.json({ status: 'ok', payload: cartUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    };
});
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).send({ message: `Cart ${cid} not found` });
        const cartUpdate = await cartDao.deleteProductsInCart(cid);
        res.json({ status: 'ok', payload: cartUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})


export default router;