if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
import express from 'express';
import * as routes from './routes/';
import * as apiRoutes from './routes/api';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl} | ${res.statusCode}`);
  next();
};

app.use(logRequestStart);

// Static routes handled by './routes/static'
app.use('/', routes.static);
app.use('/api/tasks', apiRoutes.tasks);
app.use('/api/backlogs', apiRoutes.backlogs);
app.use('/api/days', apiRoutes.days);
app.use('/api/users', apiRoutes.users);
//Server listen
mongoose.connect(process.env.DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}, (err) => {
  console.log(err);
});
