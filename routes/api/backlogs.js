import models from '../../models';
import {Router} from 'express';
const R = Router();

const ObjectId = models.ObjectId;
const Task = models.Task;
const Backlog = models.Backlog;
R.get('/', (req, res) => {
  var query;
  if (req.query.getTasks) {
    query = Backlog.find({})
      .populate('tasks');
  } else {
    query = Backlog.find({});
  }
  query.exec((err, records) => {

    if (err) {
      console.log(err);
    }

    var arr = records.map((r) => {
      var result = {
        _id: r._id,
        title: r.title,
        default: r.default
      };
      if (req.query.getTasks) {
        result.tasks = r.tasks;
      }
      return result;
    });
    res.json({
      backlogs: arr,
      count: arr.length
    });
  });
});

R.get('/:id', (req, res) => {
  var backlog_id = req.params.id;
  var query;
  if (req.query.getTasks) {
    query = Backlog.find({ _id: backlog_id })
      .populate('tasks');
  } else {
    query = Backlog.find({ _id: backlog_id });
  }

  query.exec((err, record) => {
    if (err) {
      console.error(err);
    }

    record = record[0];

    var result = {
      title: record.title,
      default: record.default
    };

    if (req.query.getTasks) {
      result.tasks = record.tasks;
    }
    
    res.json({
      backlog: result
    });
  });
});

R.post('/:id/tasks', async (req, res) => {
  let t = new Task();
  t.title = req.body.title;
  const backlog_id = req.params.id;
  t.backlog = ObjectId(backlog_id);
  await t.save();
  let query = Backlog.findOne({ _id: backlog_id }).populate('tasks');
  query.exec((err, backlog) => {
    if (err) {
      res.status(400).send("eh");
    }
    backlog.tasks.push(t);
    backlog.save().then((b) => {
      console.log(b);
      res.json(b);
    });
  });
});

export default R;
