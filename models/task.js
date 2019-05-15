import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Day = require('./day');
const Backlog = require('./backlog');
const taskSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 32,
  },
  description: String,
  deadline: Date,
  completed: {
    type: Boolean,
    default: false
  },
  backlog: {
    type: ObjectId,
    ref: 'Backlog',
    required: true
  },
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }]

});

taskSchema.pre('remove', function(next) {
  console.log("Removing Task " + this._id);
  Day.update({},
    {
      $pull: {
        tasks: { $in: [this._id] }
      }
    },
    {
      multi: true
    }
  );

  Backlog.update({},
    {
      $pull: {
        tasks: { $in: [this._id] }
      }
    },
    {
      multi: true
    }
  );

  next();
});


const Task = mongoose.model('Task', taskSchema);

export default Task;
