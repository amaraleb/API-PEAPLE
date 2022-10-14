const PostSchema = require("../models/postSchema");
const UserSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

SECRET = process.env.SECRET;

const getAllPosts = async (req, res) => {
  const token = req.get("authorization"); //busca o token

  if (!token) {
    //reporta erro caso não tenha token
    return res.status(401).send("Erro no header");
  }

  jwt.verify(token, SECRET, (err) => {
    //compara o token com o secret
    if (err) {
      return res.status(401).send("Não autorizado");
    } 
});
      //se for igual ao secret entra no else e mostra os usuários
      
      //const user = ({userId: req.params.id})
      //console.log(user);
      PostSchema.find({userId: req.params.id},(err, posts) => {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        res.status(200).send(posts);
        //console.log(posts)
        
        
        
      });
    

};

const createPost = async (req, res) => {
  const token = req.get("authorization"); //busca o token

  if (!token) {
    //reporta erro caso não tenha token
    return res.status(401).send("Erro no header");
  }

  jwt.verify(token, SECRET, (err) => {
    //compara o token com o secret
    if (err) {
      return res.status(401).send("Não autorizado");
    }
  })
  
  try {
    const body = req.body;
    const findUser = await UserSchema.findById(req.params.id);
    fname = findUser.fname;
    lname = findUser.lname;
    id = req.params.id;
    const post = {
      title: body.title,
      description: body.description,
      userId: id,
      fname: fname,
      lname: lname,
    };

    const newPost = new PostSchema(post); //armazena os dados do body na constante

    const savedPost = await newPost.save(); //salva a constante no banco de dados

    res.status(201).json({
      message: "Post adicionado com sucesso!",
      savedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
