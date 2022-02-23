const sign = require('jwt-encode')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

class UserController{
    static async login(req,res){
        let inputUsermail = req.body.email
        var salt = bcrypt.genSaltSync(10);
        let hashPassword =  bcrypt.hashSync(req.body.password,salt)
        console.log(hashPassword)
        let data = await User.findAll({
         where: {
           email : inputUsermail,
           }
         }).catch(
           (err) => {return "erro de autenticacao"+err}
         )
        if(bcrypt.compareSync(req.body.password, data[0].dataValues.password)){
          console.log(data[0].dataValues.password)
          let jwt = sign({inputUsermail},'wordsecret')
          res.setHeader('Authorization', 'Bearer '+ jwt);
          return { user: data[0], token: jwt, message: "login realizado com sucesso"}
        }
        return data
    }
    static async signup(req, res){
        let inputUserName = req.body.name
        let inputUsermail = req.body.email
        let inputCpf = req.body.cpf
        var salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(req.body.password,salt)
        const user = await User.create({
           name : inputUserName ,
           email : inputUsermail,
           password : hashPassword,
           cpf: inputCpf
        }).then(
           (user) => { return {user:user , message: "usuario cadastrado com sucesso"}}
        ).catch(
           (err) => { return {error: err}}
        )
        return user
    }
    static async getAllUsers(req,res){
      const users = await User.findAll({
      })
      return users
    }
}

module.exports = UserController