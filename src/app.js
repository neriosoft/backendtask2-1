// write your code here
const express = require('express');
require('dotenv').config();
const apiRouter = require('../routes/index');
const port = process.env.PORT || 3000;
const app = express();

//middleware for json object
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use('/api/v1', apiRouter);


app.get('/', (req, res) => {
    res.send('welcome')
})



app.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`)
});


