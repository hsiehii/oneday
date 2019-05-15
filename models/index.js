import mongoose from 'mongoose';

import Task from './task';
import Backlog from './backlog';
import Day from './day';
import Tag from './tag';
import User from './user';

const db = () => {
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
  return mongoose.connection;
};

var models = {
  Task,
  Backlog,
  Day,
  User,
  ObjectId: mongoose.Types.ObjectId,
};

export {db};

export default models;
