import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//define port & app
const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any";


//drfine public path
app.use(express.static("public"));

//define body parser
app.use(bodyParser.urlencoded({ extended: true }));

//get home
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

//get a twopart joke
app.post("/get_twopart_joke", async(req, res) => {
    try{
        const result = await axios.get(API_URL + "?type=twopart");
        res.render("index.ejs", {
            twopartJoke: JSON.stringify(result.data.setup),
            delivery: JSON.stringify(result.data.delivery)
        });
    }catch(error){
        res.render("index.ejs", {twopartJoke: JSON.stringify(error.response.data)});
    }
})

//get a single joke
app.post("/get_single_joke", async(req, res) => {
    try{
        const result = await axios.get(API_URL + "?type=single");
        res.render("index.ejs", {singleJoke: JSON.stringify(result.data.joke)});
    }catch(error){
        res.render("index.ejs", {singleJoke: JSON.stringify(error.response.data)});
    }
})

// app.post("/get_joke_delivery", async(req, res) => {
//     try{
//         const result = await axios.get(API_URL);
//         res.render("index.ejs", {delivery: JSON.stringify(result.data.delivery)});
//     }catch(error){
//         res.render("index.ejs", {delivery: JSON.stringify(error.response.data)});
//     }
// })

//define listener
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
