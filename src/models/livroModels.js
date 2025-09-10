import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const livroModel = conn.define(
    "livros",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ano_publicacao: {
            type: DataTypes.DATEONLY, //2015
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantidade_total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade_disponivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'livros',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);



export default livroModel