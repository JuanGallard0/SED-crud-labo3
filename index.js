const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(5000, function(){
  console.log("Server connected to port 5000");
});

app.get('/', (req, res) => {
  res.render('template.ejs');
});

app.post('/show', (req, res) => {
  console.log(req.body);
});
