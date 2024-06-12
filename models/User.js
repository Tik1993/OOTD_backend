const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "user",
    },
  ],
  currentItems: [
    {
      item: {
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

export default mongoose.model("User", userSchema);
