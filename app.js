const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/myproject';
const http=require('http');
mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db=client.db('testdb');
    const collection=db.collection('testcoll');
    collection.find({name:"Assem"}).toArray((err, items) => {
        console.log(items)
        http.createServer(function (req, res) {
            res.write(items[0].name+" "+items[0].surname+", "+items[0].age+" years old."); //write a response to the client
            res.end(); //end the response
          }).listen(8080);
    });
    
    client.close();
});



