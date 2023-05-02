# Project Name - Movies-Library

**Author Name**: Malek Alsheekh Hasan

## WRRC

Add an image of your WRRC here
![Web Request Response Cycle](https://davisgitonga.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.aa762b2d.png&w=3840&q=75)

## Overview

It's a server that responsed with an _URL API_ that conatin an information about a few movies.

## Getting Started

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

In this project we use **NodeJs** , **ExpressJS** and **CorsJS**.

1. We import the ExpressJS in our project to build Server.
2. When we recive the request from the user
3. Using the method that have been returned from the ExpressJS we use method called (get)this method take the path or route (**routing procces which mean every request have a specific path or route to get a specific response**) to render the resopnse to the page.
4. We use method called listen embedded in ExpressJS to start and listen on a specific port for connections.
5. Later on ,we install Axios.js and dotenv.js
6. We use axios to handle with the API like bring the data from the API (which is the 3rd party) and give the user the data.
7. We used the dotenv to hide the port of our server and the APIKEY  
## Project Features

<!-- What are the features included in you app -->

It's return an API that have a list of Movies with them information.
