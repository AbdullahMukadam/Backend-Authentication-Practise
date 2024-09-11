import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./Db/ConnectDb.js";
import UserRoutes from "./Routes/UserRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

dotenv.config();
ConnectDb()

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/user', UserRoutes)




app.listen(8000,()=> console.log("server started"))