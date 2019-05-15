require('dotenv').config();
const url = process.env.DB_URL;
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;
const models = require('../../models').default;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {

  models.Day.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  models.Task.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  models.Backlog.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  var task;
  var backlog;
  var day;
  var tag;
  for (var i = 1; i < 16; i++) {
    if (i % 5 == 0 || i == 1) {
      if (backlog) {
        backlog.save(function(err){
          if (err) {
            console.log(err);
          }
        });
      }
      backlog = new models.Backlog({
        title: `Backlog #${i}`,
        default: false
      });
      if (day) {
        day.save(function(err){
          if (err) {
            console.log(err);
          }
        });
      }
      if ( i == 10 ) {
        var now = new Date(Date.now());
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        day = new models.Day({
          date: date,
          goal: "Do something today"
        });
      }
    }

    task = new models.Task({
      title: `Task #${i}`,
      description: `This is the description for task number ${i}`,
      backlog: backlog._id
    });

    task.save(function(err){
      if (err) {
        console.log(err);
      }
    });

    backlog.tasks.push(task);
    if (day) { day.tasks.push(task); }
  }
}).then(() => {
  db.close();
});
