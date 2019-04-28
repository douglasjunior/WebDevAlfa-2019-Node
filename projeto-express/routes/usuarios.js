const { Op } = require('sequelize')
const express = require('express');
const router = express.Router();

const { Usuario } = require('../models/sequelize')

// Todas as rotas definidas aqui
// estão dentro da url '/usuarios/'

// GET /usuarios
router.get('/', function (req, res, next) {
  const nome = req.query.nome;
  const email = req.query.email;

  const where = {};
  if (nome) {
    where.nome = {
      [Op.like]: '%' + nome + '%'
    }
  }
  if (email) {
    where.email = email
  }

  Usuario.findAll({
    attributes: ['id', 'nome', 'email'],
    where
  })
    .then(function (usuarios) {
      res.status(200).json(usuarios)
    })
    .catch(function (error) {
      console.log(error)
      res.status(422).send()
    })
});

// GET /usuarios/4
router.get('/:usuarioId', function (req, res, next) {
  const usuarioId = req.params.usuarioId

  Usuario.findByPk(usuarioId)
    .then(function (usuario) {
      if (usuario) {
        const usuarioJson = usuario.toJSON()
        delete usuarioJson.senha
        res.status(200).json(usuarioJson)
      } else {
        res.status(404).send()
      }
    })
    .catch(function (error) {
      console.log(error)
      res.status(422).send()
    })
});

// DELETE /usuarios/4
router.delete('/:usuarioId', function (req, res, next) {
  const usuarioId = req.params.usuarioId

  Usuario.destroy({
    where: {
      id: usuarioId
    }
  })
    .then(function (removidos) {
      if (removidos > 0) {
        res.status(204).send()
      } else {
        res.status(404).send()
      }
    })
    .catch(function (error) {
      console.log(error)
      // res.status(422).send()
      next(error) // delega o tratamento de erro para o express
    })
});

// PUT /usuarios/4
router.put('/:usuarioId', async function (req, res, next) {
  const usuarioId = req.params.usuarioId
  const body = req.body

  // try {
  //   const usuario = await Usuario.findByPk(usuarioId);
  //   if (usuario) {
  //     const usuarioAtualizado = await usuario.update({
  //       nome: body.nome,
  //       email: body.email,
  //       nascimento: body.nascimento,
  //       senha: body.senha, // criar uma específica para alterar a senha
  //     });
  //     res.status(200).json(usuarioAtualizado)
  //   } else {
  //     res.status(404).send()
  //   }
  // } catch (error) {
  //   console.log(error)
  //   res.status(422).send()
  // }

  Usuario.findByPk(usuarioId)
    .then(function (usuario) {
      if (usuario) {
        return usuario.update({
          nome: body.nome,
          email: body.email,
          nascimento: body.nascimento,
          senha: body.senha, // criar uma específica para alterar a senha
        })
          .then(function (usuarioAtualizado) {
            const usuarioJson = usuarioAtualizado.toJSON()
            delete usuarioJson.senha
            res.status(200).json(usuarioJson)
          })
      } else {
        res.status(404).send()
      }
    })
    .catch(function (error) {
      console.log(error)
      res.status(422).send()
    })
});

// POST /usuarios
router.post('/', function (req, res, next) {
  const usuario = req.body;

  Usuario.create({
    nome: usuario.nome,
    email: usuario.email,
    nascimento: usuario.nascimento,
    senha: usuario.senha, // estudar sobre hash de senha com bcrypt
  })
    .then(function (usuarioCriado) {
      // usuário inserido com sucesso
      delete usuarioCriado.senha;
      res.status(201).json(usuarioCriado)
    })
    .catch(function (error) {
      // falha ao inserior o usuário
      if (Array.isArray(error.errors)) {
        const sequelizeError = error.errors[0]
        if (sequelizeError.type === 'unique violation'
          && sequelizeError.path === 'email') {
          res.status(422).send('O e-mail informado já existe no banco de dados.');
          return;
        }
      }
      res.status(422).send();
    })
});

module.exports = router;
