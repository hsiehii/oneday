import {Router} from 'express';
import models from '../../models';
const R = Router();

const ObjectId = models.ObjectId;
const Day = models.Day;
const Task = models.Task;

R.get('/', (req, res) => {
  var populate = Day.find().populate({ path: 'tasks', populate: { path: 'backlog'}});
  populate.exec((err, records) => {
    let arr = [];
    arr = records.map((i) => {
      return {
        _id: i._id,
        date: i.date,
        goal: i.goal,
        tasks: buildTasks(i.tasks)
      };
    });
    res.json({
      days: arr,
      count: arr.length
    });
  });
});

R.post('/', (req, res) => {
  var day = new Day(req.body);
  Day.tasks = [];
  day.save().then((record) => {
    res.json(record);
  }).catch((err) => {
    console.error(err);
    res.status(400).send("Unable to save");
  });
});

R.get('/today', (req, res) => {
  const date = new Date();
  const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const date3 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  var populate = Day.findOne({date: {"$gte": date2, "$lt": date3}}).populate({
    path: 'tasks', populate: { path: 'backlog' }});
  populate.exec((err, record) => {
    if (record) {
      res.json({
        day: {
          _id: record._id,
          goal: record.goal,
          date: record.date,
          tasks: record.tasks.length > 0 ? buildTasks(record.tasks) : []
        },
      });
    } else {
      res.json({
        day: null
      });
    }
  });
});

R.get('/:id', (req, res) => {
  var populate = Day.findOne({_id: req.params.id}).populate({
    path: 'tasks', populate: { path: 'backlog' }});
  populate.exec((err, record) => {
    res.json({
      day: {
        goal: record.goal,
        date: record.date,
      },
      _id: record._id,
      tasks: buildTasks(record.tasks)
    });
  });
});


R.post('/:id/tasks', async (req, res) => {
  const taskId = ObjectId(req.body._id);
  const dayQuery = Day.findById(req.params.id);
  dayQuery.exec((err, day) => {
    if (err) {
      console.error(err);
    }
    day.tasks.push(taskId);
    day.save((err2) => {
      if (err2) {
        console.error(err2);
      }
      day.populate({path: 'tasks', populate: {path: 'backlog'}}, (err3, newDay) => {
        if (err3) {
          console.error(err3);
        }
        if (err || err2 || err3) {
          res.status(400).send('An error occurred');
        }
        res.json(newDay);
      });
    });
  });
});

R.delete('/:id/tasks', (req, res) => {
  Task.findById(req.body._id).exec((taskErr, task) => {
    Day.findById(req.params.id)
      .populate({path: 'tasks', populate: {path: 'backlog'}}).exec((dayErr, day) => {
      if (day) {
        const i = day.tasks.indexOf(task);
        day.tasks.splice(i, 1);
        day.save();
        res.send(day);
      } else {
        res.status(400).send('Day is undefined');
      }
    });
  });
});

R.put('/:id', async function(req, res) {
  const newDay = req.body;
  let day = await Day.findOne({_id: req.params.id}).populate({path: 'tasks', populate: { path: 'backlog' }});
  day.goal = newDay.goal;
  day.save();
  res.send(day);
});

function buildTasks(taskArray) {
  return taskArray.map((i) => {
    return {
      _id: i._id,
      title: i.title,
      description: i.description,
      backlog: {
        _id: i.backlog._id,
        title: i.backlog.title,
        default: i.backlog.default
      }
    };
  });
}

export default R;
