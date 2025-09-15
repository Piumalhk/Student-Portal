//db password=ht5KKTmZp1Px8O40

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

 app.use(cors());

 //middlewares
 app.use("/",(req,res,next)=>{
    res.send("it works!");
})
 mongoose.connect("mongodb+srv://admin:ht5KKTmZp1Px8O40@cluster0.zhboudq.mongodb.net/")
 .then(() => console.log("DB Connected"))
 .then(() => {
    app.listen(5000);
    })

.catch((err) => console.log((err)));