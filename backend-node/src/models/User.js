const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  aCC: { type: Number, default: 0, required: true },
  postCount: { type: Number, default: 0},
  commentCount: { type: Number, default: 0}
});

const User = model("User", userSchema)

module.exports = User

//Authi osa kirjutamisel kasutasin kohati oma eelmisi kodutöid inspiratsiooniks