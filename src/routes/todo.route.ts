// to do api routes

import { Router } from 'express';
import { createTodo, getTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { validateRequest } from '../middleware/validationRequest';
import { createTodoValidation, todoIdValidation, updateTodoValidation } from '../validations/todo.validation';
import { authMiddleware } from '../middleware/auth';
const router = Router();


router.route('/')
    .get(authMiddleware, getTodo)
    .post(
        authMiddleware,
        validateRequest(createTodoValidation),
        createTodo
    );

router.route('/:id')
    .get(authMiddleware, validateRequest(todoIdValidation), getTodo)
    .put(authMiddleware, validateRequest(updateTodoValidation), updateTodo)
    .delete(authMiddleware, validateRequest(todoIdValidation), deleteTodo);


export default router;