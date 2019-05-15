import {Router} from 'express';
import models from '../../models';
const R = Router();

const Tag = models.Tag;
R.get('/', (req, res) => {
  Tag.find({}, (err, records) => {
    let arr = records.map((i) => {
      return {
        _id: i._id,
        name: i.name,
        description: i.description
      };
    });
    res.json({
      tags: arr,
      count: arr.length
    });
  });
});
