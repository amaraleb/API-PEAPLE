const UserSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")

SECRET = process.env.SECRET;

const getAll = async(req, res)=> {
    const token = req.get('authorization') //busca o token 
    
  
    if (!token) { //reporta erro caso não tenha token
      return res.status(401).send("Erro no header")
    }

    jwt.verify(token, SECRET, (err) => { //compara o token com o secret
        if(err) {
            return res.status(401).send("Não autorizado");
        } else { //se for igual ao secret entra no else e mostra os usuários
            UserSchema.find(function (err, users) {
                if(err) {
                  res.status(500).send({ message: err.message })
                }
                  res.status(200).send(users)
            })
        }
    })
}

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10) //transforma a senha em hash 
    req.body.password = hashedPassword //faz com que a senha seja salva no db hasherizada
  
    try {
        const newUser = new UserSchema(req.body) //armazena os dados do body na constante
  
        const savedUser = await newUser.save() //salva a constante no banco de dados 
  
        res.status(201).json({
            message: "User adicionado com sucesso!",
            savedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
  }

module.exports = {
    getAll,
    createUser
}