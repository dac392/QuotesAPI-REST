const express = require('express');
const records = require('./records');

const app = express();
app.use(express.json)

// send a GET request to /quotes to READ a list of quots
app.get('/quotes', async (req, res)=>{
    try{
        const quotes = await records.getQuotes()
        res.status(201).json(quote)
    }catch(err){
        res.status(500).json({message: err.message})
    }

});

// send a GET request to /quotes/:id to READ (view) a quote
app.get('/quotes/:id', async (req, res)=>{
    // // using == bc :id is a strign an quote.id is a number
    // const quote = records.find(quote => quote.id == req.params.id)
    try{
        const quote = await records.getQuote(req.params.id)
        if(quote){
            res.status(201).json(quote)
        } else{
            res.status(404).json({message: "Quote was not found"})
        }
        
    }catch(err){
        res.status(500).json({message: err.message})
    }

});


// send a POST request to /quotes to CREATE a new quote
app.post('/quotes', async (req, res)=>{
    try{
        if(req.body.author && req.body.quote){
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author
            });
            res.status(201).json(quote)
        }else{
            res.status(400).json({message: "Quote and Author are required"})
        }

    }catch(err){
        res.status(500).json({message: err.message})
    }

})

// send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', async (req, res)=>{
    try{
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
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// send a DELETE request to /quotes:id DELETE a quote
// send a GET request to /quotes/quote/random to READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
