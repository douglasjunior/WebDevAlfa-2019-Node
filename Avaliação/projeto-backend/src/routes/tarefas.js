const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../utils/token');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

module.exports = router;
