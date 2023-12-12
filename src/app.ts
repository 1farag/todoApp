import express from "express";
import connectDB from "./database/db-config";
import { config } from "dotenv";
import { errorHandle } from "./middleware/errorHandle.middlware";
import todoRouter from "./routes/todo.route";
config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandle);

connectDB();

app.use("/api/",todoRouter);

app.listen(3000, ()=>{
    console.log(" server run on port 3000 ");
})