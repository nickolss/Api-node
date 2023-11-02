import livros from "../models/Livro.js";

class LivroController {
	static listarLivros = async (req, resp, _) => {
		//Método antigo
		// livros.find((error, livrosRecebidos) =>{
		//   resp.status(200).json(livrosRecebidos);
		// })

		try {
			const livrosRecebidos = await livros.find().populate("autor"); //p .populate mostra um objeto com os dados do autor

			resp.status(200).json(livrosRecebidos);
		} catch (error) {
			resp
				.status(400)
				.send({ message: `${error.message} - Falha ao localizar livros` });
		}
	};

	static listrarLivroEspecifico = async (req, resp, _) => {
		const id = req.params.id;

		try {
			const livroRecebido = await livros.findById(id).populate("autor", "nome"); //o .populate Só mostra o nome do autor
			resp.status(200).json(livroRecebido);
		} catch (error) {
			resp.status(400).send({
				message: `${error.message} - Falha ao localizar livro por id`,
			});
		}
	};

	static listarLivrosPorEditora = async (req, resp, _) => {
		const editora = req.query.editora;

		try {
			await livros.find({ editora: editora }, {});
			resp.status(200).json(livros)
		} catch (error) {
			resp.status(400).send({
				message: `${error.message} - Falha ao localizar livro por editora`,
			});
		}
	};

	static cadastrarLivro = async (req, resp, _) => {
		try {
			let livro = new livros(req.body);
			livro.save();
			resp.status(201).send(livro.toJSON());
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao cadastrar livro` });
		}
	};

	static atualizarLivro = async (req, resp, _) => {
		const id = req.params.id;

		try {
			await livros.findByIdAndUpdate(id, { $set: req.body });
			resp.status(201).send("Livro atualizado com sucesso");
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao atualizar livro` });
		}
	};

	static excluirLivro = async (req, resp, _) => {
		const id = req.params.id;

		try {
			await livros.findByIdAndRemove(id);
			resp.status(200).send("Livro excluido com sucesso");
		} catch (error) {
			resp
				.status(500)
				.send({ message: `${error.message} - Falha ao excluir livro` });
		}
	};
}

export default LivroController;
