import express from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";

//TABELAS
import './models/association.js'

//ROTAS
import autorRoutes from "./routes/autorRoutes.js";
import livroRoutes from "./routes/livroRouter.js";

const app = express();

app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

conn.sync().then(() => {
    console.log("Banco de dados conectado!")
}).catch((error) => console.log(error));


//Usar rotas
app.use("/api/autores", autorRoutes)
app.use("/api/livros", livroRoutes)


app.get("/", (request, response) => {
  response.status(200).json({ mensagem: "Olá, Mundo!!" });
});

export default app;
