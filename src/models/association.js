import autorModel from "./autorModels.js";
import livroModel from "./livroModels.js";

autorModel.belongsToMany(livroModel, {
  through: "autores_livros",
  foreignKey: "autor_id",
  otherKey: "livro_id",
});

livroModel.belongsToMany(autorModel, {
    through: 'autores_livros',
    foreignKey: 'livro_id',
    otherKey: 'autor_id'
})

export { autorModel, livroModel };
