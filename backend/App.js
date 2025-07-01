const express =require('express')
const path = require('path');

const app=express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Industrial_visit_DataBase')
.then(()=>{
 console.log("Database is Connected")

}).catch((err)=>{
    console.log(err);   
})

app.use(express.json())
const cors = require('cors')
// app.use('/uploads', express.static(path.join(__dirname, 'Image')));
app.use(cors())
app.use(express.static('public/images'))
app.use(express.static('public/docs'))

app.get('/',(req,res) =>{
    res.send("Hello")
})


const MainRouter = require("./Router")

app.use('/U1', MainRouter)


app.listen(1010, () => {
    console.log('server running on port 1010');
})






















