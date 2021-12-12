const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const jwtAuth = require("./middleware/jwtAuth")
var cors = require("cors")
require("dotenv").config()


const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');

const app = express()
app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000"
}));

app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comment', commentRoutes);

app.get('/', (req, res) => {
  res.send('Working')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

module.exports = app;