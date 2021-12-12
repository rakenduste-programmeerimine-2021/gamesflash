const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.findOne({ userName })
    if (!user) throw Error("User with this username does not exist")

    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("Invalid credentials!")

    const userTemplate = {
      id: user.id,
      userName,
      email: user.email,
      creationDate: user.creationDate,
      aCC: user.aCC,
      postCount: user.postCount,
      commentCount: user.commentCount
    }

    const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
    if (!token) throw Error("Token signing failed")
    res.status(200).json({
      token,
      ...userTemplate
    })
  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.signup = async (req, res) => {
  const { userName, email, password, aCC } = req.body

  try {
    const user = await User.findOne({ userName })
    if (user) throw Error("User with that username already exists")

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error("Adding and creating password encryption failed")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Password hashing process failed")

    const newUser = new User({
      userName,
      email,
      password: hash,
      aCC
    })

    const savedUser = await newUser.save()
    if (!savedUser) throw Error("Error saving user")

    res.status(200).json({ message: "User created successfully" })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { userName, aCC } = req.body;
  if(aCC == 873333) {
    const user = await User.findOneAndDelete({ userName: userName })
    if (!user) res.status(404).send("User with that nickname does not exist")
    res.status(200).send(`Successfully deleted the following user: ${user.userName}`)
  } else {
    res.status(400).send(`Access denied`)
  }
  
}

exports.getAllUsers = async (req, res) => {
  //const { userName } = req.body;
  const allUsers = await User.find({})
  if(!allUsers) res.status(404).send("No users found!")
  res.status(200).send(allUsers);
}

exports.getAdmins = async (req, res) => {
  const aCC = 873333;
  const admins = await User.find({ acc: aCC })
  if(!admins) res.status(404).send("No admins found!")
  res.status(200).send(admins);
}