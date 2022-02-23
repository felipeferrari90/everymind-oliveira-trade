
const sequelize = require('../db/dbConfig')
const { DataTypes } = require('sequelize');



const user = sequelize.define( 'User' ,{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        unique:true,
        validate: {
           is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize});

sequelize.sync().then(() => console.log('tabela users criada')).catch(
    (err) => { console.log(`erro na criacao da tabela: ${err}`)}
)



module.exports = user