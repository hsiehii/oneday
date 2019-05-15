import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const backlogSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: true
  },
  default: {
    type: Boolean,
    required: true
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }]
});

const Backlog = mongoose.model('Backlog', backlogSchema);

export default Backlog;
