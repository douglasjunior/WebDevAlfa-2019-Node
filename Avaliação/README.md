# Avaliação WebDev-Alfa 2019 Node JS

Avaliação da disciplina de **Desenvolvimento Web com Node JS**.

# Requisitos

Utilizando a plataforma Node JS, desenvolva uma API (serviço web) que seja capaz de gerenciar uma Agenda de Tarefas com autenticação de usuários.

A API deve possuir as rotas de Cadastro, Edição e Consulta de usuário, bem como uma rota de Login para obtenção do Jason Web Token (JWT). Além disso, cada usuário logado deve ser capaz de Cadastrar, Editar, Listar e Excluir suas tarefas, bem como marcá-las como Concluída.

Todos os dados devem ser persistidos em um banco de dados de sua preferência, de forma que seja possível realizar a recuperação, edição e deleção das informações cadastradas.

As rotas da aplicação devem seguir a seguinte estrutura:

|Método|URL|Descrição|
|-|-|-|
POST|http://localhost:3001/api/usuarios|Cadastro de usuários|
POST|http://localhost:3001/api/usuarios/login|Login de usuários|
GET|http://localhost:3001/api/usuarios/1|Consulta de usuário por ID|
PUT|http://localhost:3001/api/usuarios/1|Edição de usuários|
POST|http://localhost:3001/api/tarefas|Cadastro de tarefas|
GET|http://localhost:3001/api/tarefas|Listagem de tarefas|
GET|http://localhost:3001/api/tarefas/1|Consulta de tarefa por ID|
PUT|http://localhost:3001/api/tarefas/1|Edição de tarefas|
DEL|http://localhost:3001/api/tarefas/1|Exclusão de tarefas|
PUT|http://localhost:3001/api/tarefas/1/concluida|Marcar tarefa como Concluída|
DEL|http://localhost:3001/api/tarefas/1/concluida|Desmarcar tarefa como Concluída|

Para iniciar, você pode:
- efetuar o Fork do diretório `projeto-backend`;
- criar um novo projeto utilizando o `express-generator`; ou 
- criar um novo projeto utilizando qualquer outro meio de sua preferência.

Para testar sua aplicação, você pode importar o arquivo [Gerenciamento de Tarefas.postman_collection.json](https://github.com/douglasjunior/WebDevAlfa-2019-Node/blob/master/Avaliação/Gerenciamento%20de%20Tarefas.postman_collection.json) - que contem todas as rotas necessárias - em seu [Postman](https://www.getpostman.com/postman). 

# Entrega

O projeto final deverá ser entregue via GitHub, sendo que o aluno deverá me enviar por e-mail o Link do projeto até **18 de maio de 2019** às **23h59m**.

Descreva no e-mail quaisquer instruções necessárias para executar e testar o projeto.

_Não esqueça de assinar o e-mail com o seu nome completo._

# Projeto

## Instalando as dependências

1. Faça o Clone ou Download do diretório `projeto-backend` para o seu computador.

2. Através do `cmd` ou `git bash` instale as dependências do projeto. 
    ```bash
    npm install
    ```

## Executando o projeto

Através do `cmd` ou `git bash` execute o comando:
```bash
npm run dev
```

## Dependências relevantes

|Nome|Descrição|
|-|-|
|bcryptjs|https://github.com/dcodeIO/bcrypt.js|
|express|https://github.com/expressjs/express|
|express-validator|https://github.com/express-validator/express-validator|
|jsonwebtoken|https://github.com/auth0/node-jsonwebtoken|
|moment|https://github.com/moment/moment|
|mysql2|https://github.com/sidorares/node-mysql2|
|sequelize|https://github.com/sequelize/sequelize|
|sqlite3|https://github.com/mapbox/node-sqlite3|
|cross-env|https://github.com/kentcdodds/cross-env|
|nodemon|https://github.com/remy/nodemon/|
