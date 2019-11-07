
// --------------------------------------------------------
// --------------------- fans appeal ----------------------
// --------------------------------------------------------

function createAppeal(){

    var text = document.getElementById("text");
    if (text.value.trim() == ""){
      text.classList.add("not-valid");
      return;
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    text1 = text.value
    var Appeal = {
      appeal: text1,
      date: date,
      time: time,
      user: "Fanatic"
    };

    var serialNewAppeal = JSON.stringify(Appeal);
    saveToLocalStorage(serialNewAppeal, "fans_appeals");
    document.getElementById("text").value = "";

}



function addAppealOnPage() {
var existingAppeals = getExistingFromLocalStorage("fans_appeals");
  for (appeal in existingAppeals){
    appeal = JSON.parse(existingAppeals[appeal]);
    var parent = document.getElementById("parent");

    var div = document.createElement("div");
    var p = document.createElement("p");
    var node_username = document.createTextNode(appeal.user);
    var child_div_1 = document.createElement("div");
    var br = document.createElement("br");
    var br1 = document.createElement("br");
    var hr = document.createElement("hr");
    var node_time = document.createTextNode(appeal.time);
    var node_date = document.createTextNode(appeal.date);
    var node_text = document.createTextNode(appeal.appeal);
    var child_div_2 = document.createElement("div");
    var p1 = document.createElement("p");

    div.className = "row justify-content-around padding-cont";
    p.className = "card-text";
    child_div_1.className = "col-md-2 border";
    child_div_2.className = "col-md-8 border";
    p1.className = "card-text";

    p.appendChild(node_username);
    p.appendChild(br);
    p.appendChild(node_time);
    p.appendChild(br1);
    p.appendChild(node_date);
    child_div_1.appendChild(p);
    div.appendChild(child_div_1);
    p1.appendChild(node_text);
    child_div_2.appendChild(p1);
    div.appendChild(child_div_2);
    parent.appendChild(div);
    parent.appendChild(hr);

  }

}


// --------------------------------------------------------
// ------------------------ news --------------------------
// --------------------------------------------------------

var src;

function add_news_img(files) {
  var img = document.getElementById("image");
  var reader = new FileReader();
	reader.onload = function(){
		src = reader.result;
		img.src = src;


	}
	reader.readAsDataURL(files[0]);
  alert("Uploaded");
}



function add_news() {
  var title = document.getElementById("title").value;
  var news = document.getElementById("news").value;
  var bool = true;
  var img_2 = document.getElementById("image");
  if(title == "") {
    alert("News Title is empty");
    title = document.getElementById("title");
    title.classList.add("not-valid");
    bool = false;
  }

  if(news == "") {
    alert("News Body is empty");
    title = document.getElementById("news")
    title.classList.add("not-valid");
    bool = false;
  }


  if(bool) {
    alert("Successfully added")
    var News = {
      img: src,
      title: title,
      text: news,
    };
    var serialNewNews = JSON.stringify(News);
    saveToLocalStorage(serialNewNews, "news");
    document.getElementById("title").value = "";
    document.getElementById("news").value = "";
    document.getElementById("image").src = "images/img_empty.png";

  }




}

function addNewsOnPage() {
  var existingNews = getExistingFromLocalStorage("news");
  for (news in existingNews){
    news = JSON.parse(existingNews[news]);

    var div = document.getElementById("news-div");
    var child_div = div.lastElementChild;

    var div_1 = document.createElement("div");
    var div_2 = document.createElement("div");
    var img = document.createElement("img");
    var h5 = document.createElement("h5");
    var b = document.createElement("b");
    var p = document.createElement("p");

    div_1.className = "card";
    img.className = "card-img-top";
    div_2.className = "card-body";
    div_1.className = "card";
    h5.className = "card-title";
    p.className = "card-text";

    div_1.style = "width: 18rem;";
    h5.style = "text-align: center;";

    var node_text = document.createTextNode(news.text);
    var node_title = document.createTextNode(news.title);
    img.src = news.img;
    div_1.appendChild(img);
    b.appendChild(node_title);
    h5.appendChild(b);
    div_2.appendChild(h5);
    p.appendChild(node_text)
    div_2.appendChild(p);
    div_1.appendChild(div_2);
    child_div.appendChild(div_1);

  }
}

// --------------------------------------------------------
// --------------------  localStorage- --------------------
// --------------------------------------------------------

function saveToLocalStorage(object, key){

    if (isOnline()){
        alert("Server communication");
    }
    else {
      var existingObjects = getExistingFromLocalStorage(key);
      existingObjects.push(object);
      existingObjects = JSON.stringify(existingObjects);
      localStorage.setItem(key, existingObjects);
    }
};

function getExistingFromLocalStorage(key){

        var existingObjects = localStorage.getItem(key);
        existingObjects = JSON.parse(existingObjects);
        if (existingObjects === null){
            existingObjects = [];
        }
        return existingObjects;

};

// --------------------------------------------------------
// ---------------  Additional functions ------------------
// --------------------------------------------------------

function remove_class(clicked_id) {
  var elem = document.getElementById(clicked_id);
  elem.classList.remove('not-valid');

}

function isOnline() {

    return window.navigator.onLine;
    
}


function handleConnectionChange(event){
    if(event.type == "offline"){
        alert("You are offline")
    }
    if(event.type == "online"){
        alert("Connection established");
        addAppealOnPage();
        addNewsOnPage();
        localStorage.removeItem('fans_appeals');
        localStorage.removeItem('news');

    }
}
window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);
