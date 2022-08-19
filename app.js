const express = require('express');
const records = require('./records');

const app = express();
app.use(express.json());

function asyncHandler(cb){
    return async (req, res, next)=>{
        try{
            await cb(req, res, next);
        }catch(err) {
            next(err);
        }
    }
}

// send a GET request to /quotes to READ a list of quots
app.get('/quotes', asyncHandler( async (req, res)=>{
    const quotes = await records.getQuotes()
    res.status(201).json(quote)
}));

// send a GET request to /quotes/:id to READ (view) a quote
app.get('/quotes/:id', asyncHandler( async (req, res)=>{
    // // using == bc :id is a strign an quote.id is a number
    // const quote = records.find(quote => quote.id == req.params.id)
    const quote = await records.getQuote(req.params.id)
    if(quote){
        res.status(201).json(quote)
    } else{
        res.status(404).json({message: "Quote was not found"})
    }
}));

// send a POST request to /quotes to CREATE a new quote
app.post('/quotes', asyncHandler( async (req, res)=>{
    if(req.body.author && req.body.quote){
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote)
    }else{
        res.status(400).json({message: "Quote and Author are required"})
    }
}));

// send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', asyncHandler( async (req, res)=>{
    const quote = await records.getQuote(req.params.id);
    if(quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote)
        res.status(204).end(); // success but no content as a response
        // end() just tells the server that we are done
    }else{
        res.status(404).json({message: "Quote not found"})
    }
}));

// send a DELETE request to /quotes:id DELETE a quote
app.delete("/quotes/:id", asyncHandler( async (req, res)=>{
    const quote = await records.getQuote(req.params.body);
    if(quote){
        await records.deleteQuote(quote);
        res.status(204).end();
    }else{
        res.status(404).json({message: "Quote not found"})
    }
}));

// send a GET request to /quotes/quote/random to READ a random quote


app.use((req, res, next)=>{
    const err = new Error("Not Found");
    err.status(404);
    next(err);
});

app.use( (err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        err: {message: err.message}
    });
} );

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
