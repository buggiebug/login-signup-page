const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  phone:{
    type:Number,
  },
  password: {
    type: String,
    minLength: [8, "Password must be 8 char long"],
    select:false,
    require:true
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('users',userSchema);

