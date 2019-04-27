const express = require('express');
const router = express.Router();

const { Usuario } = require('../models/sequelize')

// Todas as rotas definidas aqui
// estão dentro da url '/usuarios/'

// GET /usuarios
router.get('/', function (req, res, next) {
});

// GET /usuarios/4
router.get('/:usuarioId', function (req, res, next) {
});

// DELETE /usuarios/4
router.delete('/:usuarioId', function (req, res, next) {
});

// PUT /usuarios/4
router.put('/:usuarioId', function (req, res, next) {
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
