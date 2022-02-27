const sign = require('jwt-encode')
const bcrypt = require('bcryptjs')
const User = require('../models/user')





class UserController{
    
    static async login(req,res){
        let inputUsermail = req.body.email
        let inputPassword = req.body.password
        let data = await User.findOne({
         where: {
           email : inputUsermail,
           }
         }).catch(
           (err) => {return "erro de autenticacao: "+err}
         )
        if(await bcrypt.compare(inputPassword, data.password)){
          let jwt = sign({inputUsermail},'wordsecret')
          res.setHeader('Authorization', 'Bearer '+ jwt);
          return { user: data, token: jwt, message: "login realizado com sucesso"}
        }
        else{
          return {error:  'senha invalida, tente novamente'}
        }
    }
    static async signup(req, res){
        let inputUserName = req.body.name
        let inputUsermail = req.body.email
        let inputPassword = req.body.password
        let inputCpf = req.body.cpf
        var salt = bcrypt.genSaltSync(10);
        const user = await User.create({
           name : inputUserName ,
           email : inputUsermail,
           password : bcrypt.hashSync(inputPassword,salt),
           cpf: inputCpf
        }).then(
           (user) => { return {user:user , message: "usuario cadastrado com sucesso"}}
        ).catch(
           (err) => { throw {error: err}}
        )
        return user
    }

    //para fins de debug
    static async getAllUsers(req,res){
      const users = await User.findAll({
      })
      return users
    }
}

module.exports = UserController