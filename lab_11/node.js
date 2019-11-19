
const express=require('express');
const path = require('path');
const app=express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


function saveToModgoDB(object, collection_name) {
  dbo.collection(collection_name).insertOne(object, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
}



app.post("/sendNews", function(req, res){
  var News = {
      img: req.body.img,
      title: req.body.title,
      text: req.body.text,
  };
  console.log(req.body.img, req.body.title)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("news").insertOne(News, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  db.close();

  });

});


app.post("/sendAppeal", function(req, res){
  var Appeal = {
      appeal: req.body.appeal,
      date: req.body.date,
      time: req.body.time,
      user: req.body.user
  };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("appeals").insertOne(Appeal, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
  });
  res.redirect('/fans_appeal.html');
});


app.get('/fans_appeal.html', (req, res) => {
  console.log("redirected");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("appeals").find().toArray((err, items) => {
      //console.log(items)
      res.render("fans_appeal", {
        appeals: items,
      });
    })
    db.close();
  });
});

app.get('/news.html', (req, res) => {
    const htmlFile = req.url.slice(1);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("news").find().toArray((err, items) => {
        console.log(items)
        res.render("news", {
          news: items
        });
      });
      db.close();

    });
})

app.get('/admin.html', (req, res) => {

    res.render("admin");

})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/*', (req, res) => {
  if(req.url.endsWith('.html')) {
    const htmlFile = req.url.slice(1);
    res.sendFile(path.join(__dirname, './'+htmlFile));
  }
  else {
    res.sendFile(path.join(__dirname, './error.html'));
  }
})



const port =7000;
app.listen(port,()=>{
console.log(`App running on ${port}`);
})
