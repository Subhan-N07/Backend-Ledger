const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required for creating an account"] },
  email: { type: String, 
    required: [true, "Email is required for creating a user"],
    trim: true, 
    unique: [true, "Email already exists"], 
    lowercase: true, 
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid Email Address"] 
  },
  password: { 
    type: String, 
    required: [true, "Password is required for creating an account"], 
    minlength:[6,"Password should contain more than 6 character"], 
    select: false 
  },
  systemUser: {
    type: Boolean,
    default: false,
    immutable: true,
    select: false

  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(){
  if(!this.isModified('password')) return 
  // next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return 
  // next();
});

userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password, this.password)

}

// module.exports = mongoose.model('user', userSchema);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;