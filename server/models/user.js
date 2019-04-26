const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: String,
    email: String,
    role: String,
    password: String,
})

userSchema.path('email').validate(function(value){
    return User.findOne({email : value})
    .then(data=>{
        if(data){
            return Promise.resolve(false)
        }else{
            return Promise.resolve(true)
        }
    })
    .catch(err=>{
        return Promise.reject(err)
    })
})

userSchema.pre('save', function(done){
    this.password = hash(this.password)
    done()
})

let User = mongoose.model('User',userSchema)

module.exports = User