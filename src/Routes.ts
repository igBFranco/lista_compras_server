import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/UsersController';
import { getProducts, getProducttById, createProduct, updateProduct, deleteProduct } from './controllers/ProductsController';

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

export default router;