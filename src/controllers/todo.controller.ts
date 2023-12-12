import { Request, Response } from "express";
import ApiResponse from "../utils/response/ApiResponse";
import Todo from "../models/todo.model";

export const createTodo = async (req: Request, res: Response) => {
    const { title, description, user } = req.body;
    try {
        const todo = new Todo({
            title,
            description,
            user
        });
        const newTodo = await todo.save();
        res.status(201).json(new ApiResponse(true, "Todo created successfully", newTodo));
    } catch (error: any) {
        res.status(400).json(new ApiResponse(false, error.message, null));
    };
};

export const getTodos = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const todos = await Todo.find({
            user
        });
        res.status(200).json(new ApiResponse(true, "Todos fetched successfully", todos));
    } catch (error: any) {
        res.status(400).json(new ApiResponse(false, error.message, null));
    }
}
export const getTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    try {
        const todo = await Todo.findOne({ id, user });
        if (!todo) return res.status(404).json(new ApiResponse(false, "Todo not found", null));
        res.status(200).json(new ApiResponse(true, "Todo fetched successfully", todo));
    }
    catch (error) {
        res.status(400).json(new ApiResponse(false, "Todo not found", null));
    }
}

export const updateTodo = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { title, description, completed, user } = req.body;
    try {
        const updateTodo = await Todo.findOneAndUpdate({ id, user }, {
            title,
            description,
            completed
        },
            { new: true }
        );
        res.status(200).json(new ApiResponse(true, "Todo updated successfully", updateTodo));
    } catch (error: any) {
        res.status(400).json(new ApiResponse(false, error.message, null));
    }

}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    try {
        await Todo.findOneAndDelete({ id, user });
        res.status(200).json(new ApiResponse(true, "Todo deleted successfully", null));
    } catch (error: any) {
        res.status(400).json(new ApiResponse(false, error.message, null))
    }
}


