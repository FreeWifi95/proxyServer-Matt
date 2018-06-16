const express = require('express');
var request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = 3031;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:id', express.static('../public'));

app.get('/listing/:id', (req, res) => {
  request('http://localhost:3009/listing/:id', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/lists/:id', (req, res) => {
  request('http://localhost:3009/lists/:id', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

// app.get('/list/:id', (req, res) => {
//   request('http://localhost:3009/list/:id', function (error, response, body) { 
//     if (!error && response.statusCode === 200) {  
//       res.send(body); 
//     } 
//   });
// });

app.get('/lists2listings/:id', (req, res) => {
  request({url: 'http://localhost:3009/lists2listings/:id', qs: { listingIds: req.query.listingIds}}, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/like/:id', (req, res) => {
  request({url: 'http://localhost:3009/like/:id', qs: { data: req.query.data }}, function (error, response, body) { 
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

//photos endpoints
app.get('/photos/:id', (req, res) => {
  request(`http://localhost:3003/photos/${req.params.id}`, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

//review endpoints

app.get("/house/:houseId/",(req,res) =>  {
  request(`http://localhost:3007/house/${req.params.houseId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});
app.get(`/house/:houseId/reviews`,(req,res) =>  {
  request(`http://localhost:3007/house/${req.params.houseId}/reviews?page=${req.query.page}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/users',(req,res) =>  {
  request("http://localhost:3007/users",function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/user/:userId',(req,res) =>  {
  request(`http://localhost:3007/user/${req.params.userId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

//Booking routes
// app.get('/dates/:id', (req, res) => {
//   const { id } = req.params;
//   db.getBookedDates(id).then((data) => { res.send(data); })
//     .catch(err => console.log('err from book', err));
// });

app.get('/dates/:id',(req,res) =>  {
  request(`http://localhost:3002/dates/${req.params.id}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

// app.get('/info/:id', (req, res) => {
//   const { id } = req.params;
//   db.getPriceInfo(id).then(data => res.send(data))
//     .catch(err => console.log('err from book', err));
// });

app.get('/info/:id',(req,res) =>  {
  request(`http://localhost:3002/info/${req.params.id}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

// app.post('/dates/:id', (req, res) => {
//   const { id } = req.params;
//   const { date } = req.body;
//   let total = 0;
//   for (let i = 0; i < date.length; i++) {
//     db.postDates(id, date[i]).then((data) => {
//       total += 1;   
//       if (total === date.length) {
//         res.send('success');
//     }})
//       .catch(err => console.log('err on post server', err));
//   }
// });

app.get('/dates/:id',(req,res) =>  {
  request(`http://localhost:3002/info/${req.params.id}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.listen(port, () => console.log(`listening on ${port}`));