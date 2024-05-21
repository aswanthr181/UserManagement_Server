const express = require('express');
const mongoose = require('mongoose')
const cors=require('cors')
const dotenv = require('dotenv')
const morgan =require("morgan")
const path = require("path")
const bodyParser = require('body-parser');

const cookieParser = require("cookie-parser")


const adminRouter =require("./routes/admin.js");
const userRouter =require("./routes/users.js");

dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use(express.static("public"));

app.use(cookieParser());


app.use("/admin", adminRouter);
app.use("/", userRouter);

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/react-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  });

