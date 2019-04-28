const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite',
  define: {
    underscored: false,
    freezeTableName: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
})

const Usuario = sequelize.define('usuario', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  nascimento: Sequelize.DATEONLY,
  email: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING(200),
    allowNull: false,
  }
})

const Tarefa = sequelize.define('tarefa', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
  },
  titulo: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  concluido: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

Usuario.hasMany(Tarefa)
Tarefa.belongsTo(Usuario)

module.exports = {
  sequelize,
  Usuario,
  Tarefa
};
