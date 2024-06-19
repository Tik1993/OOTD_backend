const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["user"],
  },

  currentItems: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },

      size: {
        type: String,
      },
      color: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  favouriteItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
