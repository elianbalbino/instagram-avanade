const { request } = require('express');
const { Post, sequelize } = require('../models/');

const postsController = {
  index: async (request, response) => {
    let posts = await Post.findAll();

    return response.json(posts);
  },

  create: async (request, response) => {
    let { texto, img, usuarios_id, n_likes } = request.body;

    let novoPost = await Post.create({
      texto,
      img,
      usuarios_id,
      n_likes,
    });

    return response.json(novoPost);
  },

  update: async (request, response) => {
    let { id } = request.params;
    let { texto, img, usuarios_id, n_likes } = request.body;
    let postAtualizado = await Post.update(
      {
        texto,
        img,
        usuarios_id,
        n_likes,
      },
      {
        where: { id },
      }
    );

    return response.send(postAtualizado);
  },

  delete: async (request, response) => {
    let { id } = request.params;

    const postDeletado = await Post.destroy({
      where: { id },
    });

    return response.json(postDeletado);
  },

  show : async (request,response) => {
      let { id } = request.params;
      let mostraPost = await Post.findAll ({
          where: {usuarios_id:id },
      });
      return response.json(postExibido);
  },
};

module.exports = postsController;
