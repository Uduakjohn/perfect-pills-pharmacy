 const mongoose = require("mongoose");
 const {isEmail} = require("validator");
 const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Cant be blank"],
    },
    
    email:{
        type:String,
        required:[true, "Cant be blank"],
        lowercase:true,
        index:{unique:true,},
        validate:[isEmail, "invalid email"],
    },
   picture:{
    type:String,
   }
});

UserSchema.pre("save", function(next) {
    const users = this;
    if (!users.isModified("password",)) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(users.password, salt, function(err,hash) {
            if(err) return next(err);

            users.password = hash
            next();
        })
    })
})

UserSchema.method.toJSON = function(){
    const users = this;
    const userObject = users.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.statics.findByCredentials = async function(email,password){
    const users = await Users.findOne({email})
    if(!users) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return users
}

 const Users = mongoose.model("User", UserSchema);
 module.exports = Users