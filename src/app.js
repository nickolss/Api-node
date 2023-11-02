import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão")); //Verifica se tem erros na conexão e trata, mostrando no console a mensagem erro na conexão

db.once("open", () => {
	console.log("Conexão com o banco feita com sucesso");
}); //Abre a conexão com o banco

const app = express();
app.use(express.json()); //permite que tenha json para o post

routes(app);

export default app;
