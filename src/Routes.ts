import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/UsersController';
import { getProducts, getProducttById, createProduct, updateProduct, deleteProduct } from './controllers/ProductsController';
import { getCart, getCartById, createCart, updateCart, deleteCart } from './controllers/CartController';
import { getCartProduct, getCartProductById, createCartProduct, updateCartProduct, deleteCartProduct } from './controllers/Cart_ProductsController';

const router: Router = express.Router();

router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/products/:id', getProducttById);
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/cart/:id', getCartById);
router.get('/cart', getCart);
router.post('/cart', createCart);
router.put('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);

router.get('/cart_product/:id', getCartProductById);
router.get('/cart_product', getCartProduct);
router.post('/cart_product', createCartProduct);
router.put('/cart_product/:id', updateCartProduct);
router.delete('/cart_product/:id', deleteCartProduct);

export default router;