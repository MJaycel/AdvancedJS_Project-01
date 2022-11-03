const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minLength: [3, "Name must be at least 3 characters"],
    },
    email: {
        type: String,
        lowercase:true,
        trim:true,
        required: [true, 'Email is required'],
        dropDups: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [8, "Password must be at least 8 characters"],
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password, function(result){
        return result
    })
}
module.exports = model('user', userSchema)

