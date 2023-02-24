const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    group: {
      required: true,
      type: String,
    },
    image:{
      required: false,
      type: String
    }
  }
);

export default mongoose.model("Animal", animalSchema);
