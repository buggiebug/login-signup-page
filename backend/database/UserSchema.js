const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minLength: [8, "Password must be 8 char long"],
    select:false,
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('users',userSchema);

