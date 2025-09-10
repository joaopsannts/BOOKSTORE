import { Router } from "express";
import { cadastrarLivro } from "../controllers/livroController.js";


const router = ("/", cadastrarLivro);

export default router;