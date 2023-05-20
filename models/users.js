const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        default: Date.now(),
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});

//generating jwt token and save this token in database
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send(error)
    }
}

const User = new mongoose.model('users', UserSchema);
module.exports = User;
