import express from "express"
import { LoginUser, RegisterUser } from "../Controller/UserController.js";

const router = express.Router();

router.post("/register", RegisterUser)
router.post("/login", LoginUser)

export default router