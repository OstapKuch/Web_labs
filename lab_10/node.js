
const express=require('express');
const path = require('path');
const app=express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/fans_appeal.html', (req, res) => {
    const htmlFile = req.url.slice(1);
    var appeal = {
      author: "Fanatic",
      time: "22:42",
      date: "2019-11-17",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content."
    }
    var appeals = [appeal, appeal, appeal];
    res.render("fans_appeal", {
      appeals: appeals,
    });
})

app.get('/news.html', (req, res) => {
    const htmlFile = req.url.slice(1);
    var object = {
      src: "images/news/img_2.jpg",
      title: "22:42",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content."
    }
    var news = [object, object, object];
    res.render("news", {
      news: news,
    });
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
