const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email :{type:String,required:true},
    password:{type:String,required:true}
},{
   versionKey:false,
   timestamps:true
});

userSchema.pre("save", function (next) {

    if (!this.isModified('password')) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
});

userSchema.methods.checkPassword = function (inputpassword)
{
    const passwordHash = this.password;
    return bcrypt.compareSync(inputpassword,passwordHash);
}


const user = mongoose.model('authuser',userSchema);



module.exports = user;