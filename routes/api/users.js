import {Router} from 'express';
import models from '../../models';
const R = Router();

const User = models.User;

R.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

export default R;
