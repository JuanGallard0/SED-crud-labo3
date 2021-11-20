const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(5000, function(){
    console.log("Server connected to port 5000");
});

app.get('/', (req, res) => {
    res.render('template.ejs');
});
