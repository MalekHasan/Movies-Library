require("dotenv").config();

//import express.js framework
const express=require("express");
const app=express();
const port=process.env.PORT;
const Key=process.env.ABI_KEY;
const axios=require("axios");
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
app.get('/trending',handleTrendingMovies);
app.get('/search',handleSerchItems);
app.get('/people',handlePopularPeople);
app.get('/tv',handleLatestTv);
// handleTrendingMovies
async function handleTrendingMovies(req,res) {
    const url=`https://api.themoviedb.org/3/trending/all/day?api_key=${Key}`;
    let trendingMovies=await axios.get(url);
    let trending=trendingMovies.data.results;
    res.send(trending);
    console.log(trendingMovies);
}
// handleSerchItems
async function handleSerchItems(req,res) {
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${Key}&language=en-US&query=The&page=2`;
    let serchItems=await axios.get(url);
    let serach=serchItems.data.results;
    res.send(serach);
    console.log(serchItems);
}
// handlePopularPeople
async function handlePopularPeople(req,res) {
    const url=`https://api.themoviedb.org/3/person/popular?api_key=${Key}&language=en-US&page=1`;
    let popularPeople=await axios.get(url);
    let people=popularPeople.data.results;
    res.send(people);
    console.log(popularPeople);
}
// handleLatestTv
async function handleLatestTv(req,res) {
    const url=`https://api.themoviedb.org/3/tv/latest?api_key=${Key}&language=en-US`;
    let latestTV=await axios.get(url);
    let tv=latestTV.data;
    res.send(tv);
    console.log(latestTV);
}
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