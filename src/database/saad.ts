import Todo from "../models/todo.model";
import connectDB from "./db-config";

connectDB();
async function seed() {
    // Clear existing data
    await Todo.deleteMany({})
    // payloads 
    const todos = [
        {
            title: 'Task 1',
            description: 'Complete task 1',
            completed: false
        },
        {
            title: 'Task 2',
            description: 'Complete task 2',
            completed: true
        },
        {
            title: 'Task 3',
            description: 'Complete task 3',
            completed: false
        }
    ];
    // insert data
    return Todo.create(todos);
}


export default seed;