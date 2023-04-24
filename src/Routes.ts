import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/UsersController';

const router: Router = express.Router();

router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;