const mongoose = require("mongoose");
const amadShcema = new mongoose.Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      index: true,
    },
    amadNo: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    party: {
      type: String,
      required: true,
      minlength: 3,
      index: true,
    },
    village: {
      type: String,
      required: true,
      minlength: 3,
      index: true,
    },
    packets: {
      type: Number,
      required: true,
    },
    commodity: {
      type: String,
      required: true,
    },
    kism: {
      type: String,
    },
    lotNo: {
      type: String,
      required: true,
      index: true,
    },
    year: {
      type: Number,
      min: 1970,
      max: 9999,
      required: true,
      index: true,
      validate: function (val) {
        return val.toString().length === 4 && val >= 1970;
      },
      message: (val) => `${val.value} length is ===4`,
    },
    chamberNo: {
      type: Number,
      required: true,
      index: true,
    },
    chatta: {
      type: String,
      index: true,
    },
    gulla: {
      type: String,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { collection: "amad" }
);

module.exports = mongoose.model("amad", amadShcema);
