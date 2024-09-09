import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./Db/ConnectDb.js";
import UserRoutes from "./Routes/UserRoutes.js"
import cookieParser from "cookie-parser"

const app = express();

dotenv.config();
ConnectDb()

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/user', UserRoutes)




app.listen(8000,()=> console.log("server started"))