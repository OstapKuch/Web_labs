function add_comment() {

  if(document.getElementById("text").value != "") {

    var x = document.getElementById("text").value;
    var div = document.createElement("div");
    div.className = "row justify-content-around padding-cont";
    var p = document.createElement("p");
    p.className = "card-text";
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var node = document.createTextNode("Fanatic");
    var child_div = document.createElement("div");
    child_div.className = "col-md-2 border";
    var br = document.createElement("br");
    p.appendChild(node);
    p.appendChild(br);
    node = document.createTextNode(time);
    p.appendChild(node);
    br = document.createElement("br");
    p.appendChild(br);
    node = document.createTextNode(date);
    p.appendChild(node);
    child_div.appendChild(p);
    div.appendChild(child_div);
    var hr = document.createElement("hr");
    var parent = document.getElementById("parent");
    child_div = document.createElement("div");
    child_div.className = "col-md-8 border";
    p = document.createElement("p");
    p.className = "card-text";
    node = document.createTextNode(x);
    p.appendChild(node)
    child_div.appendChild(p)
    div.appendChild(child_div)
    parent.appendChild(div);
    parent.appendChild(hr);
    document.getElementById("text").value = ""
  }
  else {
    title = document.getElementById("text")
    title.classList.add("not-valid");
  }
}
window.URL = window.URL || window.webkitURL;
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

function add_news_img(files) {
  var fileElem = document.getElementById("input");
  objectURL = window.URL.createObjectURL(files[0]);
  var parent = document.getElementById("image");
  parent.src =  window.URL.createObjectURL(files[0]);
  alert("Uploaded");


}

function remove_class(clicked_id) {
  var elem = document.getElementById(clicked_id)
  elem.classList.remove('not-valid');

}

function add_news() {
  var title = document.getElementById("title").value;
  var news = document.getElementById("news").value;
  var bool = true;
  var location = document.getElementById("image").src
  var trimmedString = location.substring(location.length-20, location.length);
  if( trimmedString == "images/img_empty.png") {
    alert("Please add image");
    bool = false;
  }

  if(title == "") {
    alert("News Title is empty");
    title = document.getElementById("title")
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
    document.getElementById("title").value = ""
    document.getElementById("news").value = ""
    document.getElementById("image").src = "images/img_empty.png"

  }


}
