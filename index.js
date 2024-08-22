import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const myServer = express()
const port = 3400

myServer.use(express.static('public'))
myServer.use(bodyParser.urlencoded({extended:true}))


myServer.get('/', (req, res) => {
    res.render('index.ejs', { crypto: null, price: null, error: null });
});

myServer.post('/check', async (req, res) => {
    const cryptoName = req.body.cryptoName.toUpperCase(); 

    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${cryptoName}-USD`, {
            headers: {
                'API-KEY': 'f33e7b13-b582-4c86-8d47-dac10cb7b7ac'
            }
        });

        const price = response.data.last_trade_price;

        res.render('index.ejs', { crypto: cryptoName, price: price, error: null });
    } catch (error) {
        res.render('index.ejs', { crypto: null, price: null, error: 'Unable to fetch the price. Please try again.' });
    }
});


myServer.listen(port,()=>{
    console.log(`The server is currently running at port ${port}`)
})