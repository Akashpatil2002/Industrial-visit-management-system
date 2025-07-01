const { default: mongoose } = require('mongoose')
const AdNotifi= require('mongoose');

const Adnot = new AdNotifi.Schema({

  visitId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'colvisitMod' },
  status: { type: String },
  reason: { type: String },
}, { timestamps: true });

module.exports=AdNotifi.model('AdNotifiMod',Adnot)