
import { response } from "express";
import { autorModel, livroModel } from "../models/association.js";


export const cadastrarLivro = async (request, response) => {
    const {
        titulo,
        isbn,
        descricao,
        ano_publicacao,
        genero,
        quantidade_total,
        quantidade_disponivel,
        autores,
    } = request.body;

    if(!titulo) {
        response.status(400).json({mensagem: "O campo título não pode ser nulo"})
        return
    }
    if(!isbn) {
        response.status(400).json({mensagem: "O campo ISBN não pode ser nulo"})
        return
    }
    if(!descricao) {
        response.status(400).json({mensagem: "O campo descrição não pode ser nulo"})
        return
    }
    if(!ano_publicacao) {
        response.status(400).json({mensagem: "O campo ano_publicacao não pode ser nulo"})
        return
    }
    if(!genero) {
        response.status(400).json({mensagem: "O campo genero não pode ser nulo"})
        return
    }
    if(!quantidade_total) {
        response.status(400).json({mensagem: "O campo quantidade_total não pode ser nulo"})
        return
    }
    if(!quantidade_disponivel) {
        response.status(400).json({mensagem: "O campo quantidade_disponivel não pode ser nulo"})
        return
    }

    if(!Array.isArray(autores) || autores.length === 0) {
        response.status(400).json({mensagem: "O campo autores deve ser array e possuir pelo menos um autor"});
        return;
    }

    try {
        const autoresEncontrados = await autorModel.findAll({
            where: {
                id: autores,
            }
        }); 
        console.log("Retorno do banco", autoresEncontrados.length);
        console.log("Quantidade do request", autores.length);

    if (autoresEncontrados.length !== autores.length) {
        response.status(404).json({
            mensagem: "Um ou mais IDs de autores são inválidos ou não existem",
        });
        return;
    }

    const livro = await livroModel.create({
        titulo,
        isbn,
        descricao,
        ano_publicacao,
        genero,
        quantidade_total,
        quantidade_disponivel
    });
    await livro.addAutores(autores);

    const livroComAutor = await livroModel.findByPk(livro.id, {
        attributes: { exclude: ["created_at", "update_at"]},
        include: {
            model: autorModel,
            attributes: {exclude: ["created_at", 'update_at']},
            through: {attributes: []}
        }
        
    } );

    response.status(200).json({ mensagem: "Livro cadastrado", livroComAutor});

    } catch {error}

}