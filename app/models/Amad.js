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
    amadNo: {
      type: Number,
      unique: true,
      index: true
    },
    packets: {
      type: Number,
      required: true
    },
    kism: [{ type: String,required: true,index:true }],
    lotNo: {
      type: String,
    },
    year: {
      type: Number,
      index: true
    },
    chamberNo: {
      type: Number,
      required: true,
      index: true,
      default: 1,
      enum: [1, 2, 3, 4]
    },
    grading: {
      type: String,
      enum: ["CHATTA", "GULLA", "KIRRI", "MIX"],
      index: true,
      default:"MIX"
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
  this.lotNo = `${this.amadNo}/${this.packets}`;
  next();
});

const AmadObj = mongoose.model("Amad", amadSchema);

module.exports = AmadObj;
