useLocalStorage = false;

class IndexedDB {

  constructor() {

  }

 connectDB(f) {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let request = indexedDB.open("mydb", 1);
    request.onerror = function(err) {
        console.log(err);
    };
    request.onsuccess = function() {
        f(request.result);
    }
    request.onupgradeneeded = function(e) {
        e.currentTarget.result.createObjectStore("fans_appeals", {
            keyPath: "id",
            autoIncrement: true
        });
        e.currentTarget.result.createObjectStore("news", {
            keyPath: "id",
            autoIncrement: true
        });
    }
}

 logerr(err) {
    console.log(err);
}

 saveToIndexedDB(object, storageName) {
    this.connectDB(function(db) {
        console.log(object);
        var request = db.transaction([storageName], "readwrite").objectStore(storageName).put(object);

        request.onerror = this.logerr;
        request.onsuccess = function() {
            console.log(request.result);
        }
    });

}

 clearDB() {
    var request = indexedDB.deleteDatabase("mydb");
    request.onerror = this.logerr;
    request.onsuccess = function() {
        console.log("Deleated DB")
    }
}

};

class LocalStorage {

 saveToLocalStorage(object, key) {


    var existingObjects = object.getExistingFromLocalStorage(key);
    existingObjects.push(object);
    existingObjects = JSON.stringify(existingObjects);
    localStorage.setItem(key, existingObjects);

};

 getExistingFromLocalStorage(key) {

    var existingObjects = localStorage.getItem(key);
    existingObjects = JSON.parse(existingObjects);
    if (existingObjects === null) {
        existingObjects = [];
    }
    return existingObjects;

};

}

var object;
if (useLocalStorage){
    object = new LocalStorage();
}
else{
    object = new IndexedDB();
}
