const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config()

const authRoutes = require("./routes/authRoutes");

const app = express();

app.listen(3001, () => {
    console.log("Servidor iniciou na porta 3001.");
});

//dados do mongoose
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.r5j0a.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Banco conectado com sucesso");
})
.catch((err) => {
    console.log(err.message);
});

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
app.use(cookieParser());
  
app.use(express.json());
app.use("/", authRoutes);