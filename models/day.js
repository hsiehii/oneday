import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const daySchema = new mongoose.Schema ({
  date: {
    type: Date,
    required: true
  },
  goal: {
    type: String,
    default: "No goal"
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task',
  }]
});


const Day = mongoose.model('Day', daySchema);

export default Day;
