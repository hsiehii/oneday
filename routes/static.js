import express from 'express';
const R = express.Router();

R.get('/', (req, res) => {
  res.send('hello');
})

export default R;
