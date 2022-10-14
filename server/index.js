const express = require("express");
const app = express();
const mongoose = require("mongoose")
const UserModel = require("./models/users");
const cors = require("cors");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ppp:Iddyjohn1@cluster1.pujcpov.mongodb.net/?retryWrites=true&w=majority")

 app.get("/getUsers", (req,res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }else{
            res.json(result)
        }
    })

  });

app.post("/createUsers", async (req,res) => {
    const users = req.body
    const newUser = new UserModel(users);
    await newUser.save();

    res.json(users);
})

app.post("/postPics", async (req,res) => {
    const users = req.body
    const newPic = new UserModel(users);
    await newPic.save();

    res.json(users)
})

app.listen(3001, () => {
    console.log("SERVER IS UP AND RUNNING");
})