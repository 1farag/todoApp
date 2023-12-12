// to do api routes

import { Router } from 'express';
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { validateRequest } from '../middleware/validationRequest';
import { createTodoValidation, todoIdValidation, updateTodoValidation } from '../validations/todo.validation';
const router = Router();


router.route('/')
    .get(getTodos)
    .post(
        validateRequest(createTodoValidation),
        createTodo
    );

router.route('/:id')
    .get(validateRequest(todoIdValidation) ,getTodo)
    .put(validateRequest(updateTodoValidation), updateTodo)
    .delete(validateRequest(todoIdValidation) ,deleteTodo);


export default router;
