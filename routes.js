const express = require('express');
const router = express.Router();
const records = require('./records');

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
router.get('/quotes', asyncHandler( async (req, res)=>{
    const quotes = await records.getQuotes()
    res.status(201).json(quotes)
}));

// send a GET request to /quotes/:id to READ (view) a quote
router.get('/quotes/:id', asyncHandler( async (req, res)=>{
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
router.post('/quotes', asyncHandler( async (req, res)=>{
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
router.put('/quotes/:id', asyncHandler( async (req, res)=>{
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
router.delete("/quotes/:id", asyncHandler( async (req, res)=>{
    const quote = await records.getQuote(req.params.id);
    if(quote){
        await records.deleteQuote(quote);
        res.status(204).end();
    }else{
        res.status(404).json({message: "Quote not found"})
    }
}));

// send a GET request to /quotes/quote/random to READ a random quote

module.exports = router;