import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const chunkSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: true
  },
  description: String,
  start_time: Date,
  end_time: Date,
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }],
  finished: Boolean
})

const Chunk = mongoose.model('Chunk', chunkSchema);

export default Chunk;
