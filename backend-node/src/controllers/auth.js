const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
  const { userName, email, password } = req.body

  try {
    const user = await User.findOne({ userName })
    if (!user) throw Error("User with this e-mail does not exist")
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("I should not say that the password does not match")

    const userTemplate = {
      id: user.id,
      userName,
      email,
      creationDate,
      aCC,
      postCount,
      commentCount
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

    if (user) throw Error("User with that e-mail already exists")

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error("Adding and creating password encryption failed")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Password hashing process failed")

    const newUser = new User({
      userName,
      email,
      password: hash,
      creationDate,
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
  const { userName, aCC } = req.params;
  if(aCC % 3 == 0 && aCC > 873332 && aCC < 872995) {
    const user = await User.findOneAndDelete({ userName: userName })
    if (!user) res.status(404).send("User with that nickname does not exist")
    res.status(200).send(`Successfully deleted the following user: ${user.userName}`)
  } else {
    res.status(200).send(`Access denied`)
  }
  
}