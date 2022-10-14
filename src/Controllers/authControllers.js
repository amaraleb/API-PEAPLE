const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        UserSchema.findOne({ email: req.body.email }, (error, user) => { //busca se o usuário (email) existe
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}` //apenas escreve o email que tentou fazer login abaixo da mensagem
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password) //compara a senha hasherizada com a senha do body

            if(!validPassword) { //se a senha não for igual entra no loop
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const token = jwt.sign({ fname: user.fname }, SECRET) //gera o token
            const id = user._id
            console.log(id)
            res.status(200).send({ 
                message: "Login autorizado",
                token, //escreve o token abaixo da mensagem
                id
            })
        })
    } catch(e) {
        console.error(e)
    }
}

module.exports = {
    login
}