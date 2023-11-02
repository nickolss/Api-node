import autores from "../models/Autor.js";

class AutorController {
	static listarAutores = async (req, resp, _) => {
		try {
			const autoresRecebidos = await autores.find();
			resp.status(200).json(autoresRecebidos);
		} catch (error) {
			resp
				.status(400)
				.send({ message: `${error.message} - Falha ao localizar autores` });
		}
	};

	static listrarAutorEspecifico = async (req, resp, _) => {
		const id = req.params.id;

		try {
			const autorRecebido = await autores.findById(id);
			resp.status(200).send(autorRecebido);
		} catch (error) {
			resp.status(400).send({
				message: `${error.message} - Falha ao localizar autor por id`,
			});
		}
	};

	static cadastrarAutor = async (req, resp, _) => {
		try {
			let autor = new autores(req.body);
			autor.save();
			resp.status(201).send(autor.toJSON());
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao cadastrar autor` });
		}
	};

	static atualizarAutor = async (req, resp, _) => {
		const id = req.params.id;

		try {
			await autores.findByIdAndUpdate(id, { $set: req.body });
			resp.status(201).send("Autor atualizado com sucesso");
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao atualizar autor` });
		}
	};

	static excluirAutor = async (req, resp, _) => {
		const id = req.params.id;

		try {
			await autores.findByIdAndRemove(id);
			resp.status(200).send("Autor excluido com sucesso");
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao excluir autor` });
		}
	};
}

export default AutorController;
