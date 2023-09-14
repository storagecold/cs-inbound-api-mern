const mongoose = require("mongoose");

const amadSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      index: true
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      index: true
    },
    serialNo: {
      type: Number,
      unique: true,
      index: true
    },
    amadNo: {
      type: Number,
      unique: true,
      index: true
    },
    packet: {
      type: Number,
      index: true
    },
    nikasi: {
      type: Number,
      default:0,
      index: true
    },
    balance: {
      type: Number,
      index: true
    },
    kism: { type: String, required: true, index: true },
    lotNo: {
      type: String,
    },
    year: {
      type: Number,
      index: true
    },
    roomNo: {
      type: Number,
      required: true,
      index: true,
      default: 1,
      enum: [1, 2, 3, 4]
    },
    grading: {
      type: String,
      enum: ["CHHATTA", "GULLA", "KIRRI", "MIX"],
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

amadSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.year = currentDate.getFullYear();
  next();
});

const AmadObj = mongoose.model("Amad", amadSchema);

module.exports = AmadObj;
