import express from "express";
import connectDB from "./database/db-config";
import { config } from "dotenv";
import { errorHandle } from "./middleware/errorHandle.middlware";
import todoRouter from "./routes/todo.route";
import userRouter from "./routes/user.route";
config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandle);

connectDB();

app.use("/api/todo/", todoRouter);
app.use("/api/users/", userRouter);

app.listen(3000, ()=>{
    console.log(" server run on port 3000 ");
})