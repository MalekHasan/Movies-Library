require("dotenv").config();
//import express.js framework
const express=require("express");
const app=express();
//hide the data value[port, Key]
const port=process.env.PORT;
const Key=process.env.ABI_KEY;
//import axios.js
const axios=require("axios");
//import cors.js
const cors=require("cors");
app.use(cors());
app.use(express.json());
//import pg.js
const pg = require("pg");
const client= new pg.Client(process.env.DATABSAE_URL);
//import Movies data
const mData =require('./Movies_Data/data.json')
let result=[];
//bulid an object to handle and push data that came from mData
function Movies(id,title,image_path,time,genre,actors,description,imdbRating){
    this.id=id;
    this.title=title;
    this.image_path=image_path;
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
        console.log(element);
        new Movies(element.Id,element.Title,element.Image,element.Runtime,element.Genre,element.Actors,element.Plot,element.imdbRating)
    })
    res.json(result);
})
app.get('/favorite',(req,res)=>{res.send("Welcome to Favorite Page")})
app.get('/trending',handleTrendingMovies);
app.get('/search',handleSerchItems);
app.get('/people',handlePopularPeople);
app.get('/tv',handleLatestTv);
app.get('/movie',getMoviesHandler);
app.post('/movie',addMoviesHandler);
/* ************************************** */
app.delete('/delete/:id',deleteMoviesHandler);
app.put('/update/:id',updateMoviesHandler);
app.get('/getMovie/:id',getMovieHandler);
// handleTrendingMovies
function getMovieHandler(req,res){
    const movieId=req.params.id;
    const sql =`select * from movie where id=${movieId}`;
    client.query(sql).then((data)=>{
        res.status(200).send(data.rows)
    })
}
function updateMoviesHandler(req,res){
    const movieId=req.params.id;
    const sql=`update movie set
        title=$1,image_path=$2,runtime=$3,gener=$4,actors=$5,plot=$6,imdbrating=$7
        where id=${movieId} returning *;`
    const values=[req.body.title,req.body.image_path,req.body.runtime,req.body.genre,req.body.actors,req.body.plot,req.body.imdbrating]
    client.query(sql,values).then((data)=>{
        res.status(200).send(data.rows);
    })
}
function deleteMoviesHandler(req,res)
{
    const movieId=req.params.id;
    const sql=`delete from movie where id=${movieId};`
    client.query(sql).then((data)=>{
        res.status(200).send("success");})
}
function getMoviesHandler(req,res){
    const sql ='select * from movie;'
    client.query(sql).then((data)=>{
        let movies=data.rows.map((e)=>{
            return new Movies(e.id,e.title,e.image_path,e.runtime,e.genre,e.actors,e.plot,e.imdbrating)
        })
        res.send(movies)
    })
}
function addMoviesHandler(req,res){
    const movie=req.body;
    const values=[movie.title,movie.image_path,movie.runtime,movie.genre,movie.actors,movie.plot,movie.imdbrating]
    const sql=`INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ($1,$2,$3,$4,$5,$6,$7);`
    client.query(sql,values).then(()=>{
        res.send("Adding Movie Successful")
    })
}
async function handleTrendingMovies(req,res) {
    const url=`https://api.themoviedb.org/3/trending/all/day?api_key=${Key}`;
    let trendingMovies=await axios.get(url);
    let trending=trendingMovies.data.results;
    res.send(trending);
}
// handleSerchItems
async function handleSerchItems(req,res) {
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${Key}&language=en-US&query=The&page=2`;
    let serchItems=await axios.get(url);
    let serach=serchItems.data.results;
    res.send(serach);
}
// handlePopularPeople
async function handlePopularPeople(req,res) {
    const url=`https://api.themoviedb.org/3/person/popular?api_key=${Key}&language=en-US&page=1`;
    let popularPeople=await axios.get(url);
    let people=popularPeople.data.results;
    res.send(people);
}
// handleLatestTv
async function handleLatestTv(req,res) {
    const url=`https://api.themoviedb.org/3/tv/latest?api_key=${Key}&language=en-US`;
    let latestTV=await axios.get(url);
    let tv=latestTV.data;
    res.send(tv);
}
// handle page error
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
client.connect().then(()=>{
    app.listen(port,()=>{
        console.log(`server is working on port ${port}`)
    })
})