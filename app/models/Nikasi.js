const mongoose = require("mongoose");

const nikasiSchema = new mongoose.Schema(
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
    amad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Amad',
      index: true
    },
    amadNo: {
      type: Number,
    },
    serialNo: {
      type: Number,
      unique: true,
      index: true
    },
    packet: {
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
    year: {
      type: Number,
      index: true
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

nikasiSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.year = currentDate.getFullYear();
  next();
});

const NikasiObj = mongoose.model("Nikasi", nikasiSchema);

module.exports = NikasiObj;
