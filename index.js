const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://juan:uca99@cluster0.owwru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });client.connect(err => {
    db = client.db("mongodb").collection("cds");    app.listen(3001, function(){
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(5000, function(){
  console.log("Server connected to port 5000");
});

app.get('/', (req, res) => {
  res.render('template.ejs');
});

var ObjectId = require('mongodb').ObjectID;//EDIT
app.route('/edit/:id')
.get((req,res) => {
    var id = req.params.id;db.find(ObjectId(id)).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
     res.render('edit.ejs', { cds: result });
    });
})
.post((req,res) => {
    var id = req.params.id;
    var title = req.body.title;
    var artist= req.body.artist;
    var genre = req.body.genre;db.updateOne({_id: ObjectId(id)}, {
        $set: {
     title: title,
     artist: artist,
     genre: genre    
 }
    }, (err, result) => {
     if (err) return res.send(err);
        res.redirect('/show');
 console.log("Successfully Updated!");
    })
});

app.post('/show', (req, res) => {
    db.insertOne(req.body, (err, result) => {
        if (err) return console.log("Erro: " + err);
 
        console.log("Saved succesfully!");
        res.redirect('/');
        db.find().toArray((err, results) => {
          console.log(results);
        });
    });
});

app.get('/', (req, res) => {
    const cursor = db.find();
});

app.get('/show', (req, res) => {
    db.find().toArray((err, results) => {
        if (err) return console.log("Error: "+ err);
        res.render('show.ejs', { cds: results });
    });
});

//DELETE
app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id;db.deleteOne({_id: ObjectId(id)}, (err, result) => {
     if (err) return res.send(500, err);
 console.log("Registo eliminado com sucesso!");
 res.redirect('/show');
    });
});
