import mongoose from 'mongoose';
let bcrypt = require('mongoose-bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 32,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.plugin(bcrypt);

const User = mongoose.model('User', userSchema);

export default User;
