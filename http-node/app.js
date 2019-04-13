const express = require('express')
const { check } = require('express-validator/check')

const validatorMiddleware = require('./validator-middleware')
const { verifyToken, signToken  } = require('./authentication-middleware')

const porta = 3000
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

let proximoId = 3
const BANCO_DADOS = [
    {
        id: 1,
        nome: 'Douglas',
        email: 'douglas@smarppy.com'
    },
    {
        id: 2,
        nome: 'Bruna',
        email: 'bruna@email.com'
    }
]

// GET http://localhost:3000/usuarios
server.get('/usuarios', verifyToken, function (request, response) {
    // consultar os usuários no banco de dados e devolver na requisição
    response.json(BANCO_DADOS)
})

// GET http://localhost:3000/usuarios/14
server.get('/usuarios/:usuarioId', verifyToken, function (req, res) {
    // consultar o usuário pelo ID e devolver na requisição
    const usuarioId = req.params.usuarioId;

    const usuario = BANCO_DADOS.find(usu => usu.id == usuarioId)

    if (usuario) {
        // encontrei o usuário
        res.json(usuario)
    } else {
        // não encontrei o usuário
        res.status(404).send('Usuário não encontrado')
    }

    // const usuario = BANCO_DADOS.find(function(usu, index) {
    //     return usu.id == usuarioId
    // })

    // let usuario;
    // for (let i = 0; i < BANCO_DADOS.length; i++) {
    //     const usu = BANCO_DADOS[i]
    //     if (usu.id == usuarioId) {
    //         usuario = usu
    //         break
    //     }
    // }
})

// POST http://localhost:3000/usuarios
server.post('/usuarios', verifyToken,
    [
        check('nome').isString().isLength({ min: 2 }).trim()
            .withMessage('O nome deve ter no mínimo 2 caracteres.'),
        check('email').isEmail().trim()
            .withMessage('Endereço de e-mail inválido.'),
        // check('dependentes[].nome').isString().isLength({ min: 2 }).trim()
        // check('endereco.cep').isCEP().trim()
        validatorMiddleware,
    ],
    function (req, res) {

        // inserir no banco de dados o usuário recebido na requisição
        const usuario = req.body;

        usuario.id = proximoId;
        proximoId++;

        BANCO_DADOS.push(usuario)

        res.status(201).send()
    })

server.post('/login', function (req, res) {
    // recebe as credenciais do usuário e valida com as informações de
    // autenticação
    const email = req.body.email;
    const senha = req.body.senha;

    if (email == 'admin@mail.com' && senha == '123456') {
        // usuário autenticado com sucesso
        const token = signToken('admin@mail.com')
        res.json({ token })
    } else {
        // email ou senha inválidos
        res.status(401).send('E-mail ou senha incorretos')
    }
})

server.listen(porta, function () {
    console.log('Servidor iniciado na porta ' + porta)
})
