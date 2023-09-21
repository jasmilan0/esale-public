const mongoose = require('mongoose');
const {Schema} = mongoose;

const EmployeeSchema = new Schema ({
  firstName: String,
  lastName: String,
  dateTimeField: {
    type: Date,
    required: true, 
    default: Date.now,
  },
  businesssId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  email: {type:String, unique:true},
  password: String
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;