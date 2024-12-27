const express= require('express');
const app = express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const cors=require('cors')
require('dotenv/config')

app.use(cors())
app.options('*',cors())

//middleware
app.use(bodyParser.json())

//Routes
const productRoutes= require('./Routes/products')

app.use(`/api/products`,productRoutes);

//database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewURLParser:true
})
.then(() => {
    console.log('Database is connected')
})
.catch((err) => {
console.log(err)    
})
//server
app.listen(process.env.Port,() => {
    console.log("server is running")
})