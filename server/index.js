const express = require('express');
var request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = 3031;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../public'));

app.get('/listing', (req, res) => {
  request('http://localhost:3009/listing', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/lists', (req, res) => {
  request('http://localhost:3009/lists', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/list', (req, res) => {
  request('http://localhost:3009/list', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/lists2listings', (req, res) => {
  request({url: 'http://localhost:3009/lists2listings', qs: { listingIds: req.query.listingIds}}, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/like', (req, res) => {
  request({url: 'http://localhost:3009/like', qs: { data: req.query.data }}, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.post('/like', (req, res) => {
  request.post('http://localhost:3009/like', {form:{data: req.body.data}}, (err, res) => { 
    if (err) {
      console.log(err);   
    } else {
      console.log('we did it') 
    }
  });
});

app.post('/lists', (req, res) => {
  request.post('http://localhost:3009/lists', {form:{
    listingId: req.body.listingId, 
    listId: req.body.listId,
    liked: req.body.liked}
  }, (err, res) => { 
    if (err) {
      console.log(err);   
    } else {
      console.log('we did it lists') 
    }
  });
});


  
app.listen(port, () => console.log(`listening on ${port}`));