const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartyLedgerSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: 'Account', index: true },
  amad: { type: Schema.Types.ObjectId, ref: 'Amad', index: true },

  amadTodal: { type: Number, default: 0 },
  nikasiTotal: { type: Number, default: 0 },
  amadBalance: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
},
  { timestamps: true }
);

const PartyLedgerSchematObj = mongoose.model('Partyledger', PartyLedgerSchema);
module.exports = PartyLedgerSchematObj;

