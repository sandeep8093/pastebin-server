const mongoose = require('mongoose');

const pasteSchema = mongoose.Schema({
  idx: { type: String, required: true },
  paste: { type: String,  },
  title: { type: String,  },
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: () => Date.now() + 24 * 60 * 60 * 1000
  }
  
});

pasteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Paste", pasteSchema);


