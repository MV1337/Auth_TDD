const User = require("../model/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExixts = await User.findOne({ email });

  if (userExixts) {
    res.status(422).json({ errors: ["Usuário já cadastrado no sistema"] });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ email: req.body.email });
  } catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro, tente mais tarde!!!"] });
    return;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(403).json({ msg: "Usuario não encontrado!" });
    return;
  }

  const comparePassoword = bcrypt.compareSync(password, user.password);
  if (!comparePassoword) {
    res.status(422).json({ msg: "Senha incorreta" });
    return;
  }

  jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "48h" }, (err, token) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.status(200).json({ token });
    }
  });
};

//apenas para deletar dados dos testes
const deleteUser = async (req, res) => {
  const email = req.params.email;
  await User.deleteOne({ email });
  res.sendStatus(200);
};

module.exports = {
  register,
  login,
  deleteUser,
};
