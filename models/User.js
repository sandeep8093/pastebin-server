const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expireAfterSeconds: 600,
      partialFilterExpression: { verified: false }
    },
    
   
  },
  { timestamps: true },
  { minimize: false }
);

module.exports = mongoose.model('User', userSchema);
