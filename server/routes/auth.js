import express from "express";
import { login, getAllUsers, getUserById } from "../controllers/auth.js";

const router = express.Router(); 

router.post("/login", login); 
router.get("/users", getAllUsers); 
router.get("/users/:id", getUserById);

export default router;
