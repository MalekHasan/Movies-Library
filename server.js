//import express.js framework
const express=require("express");
const app=express();
const port=3000;
//import cors.js
const cors=require("cors");
app.use(cors());
//import Movies data
const mData =require('./Movies_Data/data.json')
let result=[];
//bulid an object to handle and push data that came from mData
function Movies(title,time,genre,actors,description,imdbRating){
    this.title=title;
    this.time=time;
    this.genre=genre;
    this.actors=actors;
    this.description=description;
    this.imdbRating=imdbRating;
    result.push(this);
}
//routing server 
app.get('/',(req,res)=>{
    mData.forEach((element)=>{
        new Movies(element.Title,element.Runtime,element.Genre,element.Actors,element.Plot,element.imdbRating)
    })
    res.json(result);
})
app.get('/favorite',(req,res)=>{
    res.send("Welcome to Favorite Page")
})
//handle page error
app.use(notFoundPage)
function notFoundPage(req,res){
    res.status(404).send("Page Not Found");
}

app.use(serverErrorPage);
function serverErrorPage(req,res){
    const err500={
        "status": 500,
        "responseText": "Sorry, something went wrong"
        };
    res.status(500).send(err500)
}
//this server start and listen on port 3000
app.listen(port,()=>{
    console.log(`server is working on port ${port}`)
})