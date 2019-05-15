import {Router} from 'express';
import models from '../../models';
const R = Router();

const Task = models.Task;
R.get('/', (req, res) => {
  Task.find({}, (err, records) => {
    let arr = [];
    arr = records.map((i) => {
      return {
        title: i.title,
        description: i.description,
        deadline: i.deadline,
        backlog: i.backlog
      };
    });
    res.json({
      tasks: arr,
      count: arr.length
    });
  });
});

R.delete('/:id', (req, res) => {
  Task.findOneAndDelete({_id: req.params.id}).then((record) => {
    res.json(record);
  });
});

export default R;
