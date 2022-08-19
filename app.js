const express = require('express');
const {records} = require('./data');
const app = express();

app.get('/quotes', (req, res)=>{
    res.json(records);
});

app.get('/quotes/:id', (req, res)=>{
    // using == bc :id is a strign an quote.id is a number
    const quote = records.find(quote => quote.id == req.params.id)
    res.json(quote)
});


// send a GET request to /quotes to READ a list of quots
// send a GET request to /quotes/:id to READ (view) a quote
// send a POST request to /quotes to CREATE a new quote
// send a PUT request to /quotes/:id to UPDATE (edit) a quote
// send a DELETE request to /quotes:id DELETE a quote
// send a GET request to /quotes/quote/random to READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
