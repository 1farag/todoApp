import {Schema, InferSchemaType, model} from "mongoose";


const TodoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    },
    { 
        timestamps: true
    }
);

export type Todo = InferSchemaType<typeof TodoSchema>;

const Todo = model<Todo>("Todo", TodoSchema);

export default Todo;