import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDB } from './database/initialize-mongodb';
import controller from './rest-controller/controller';
import getAboutHTML from './service/get-html-about';

// server port
let port = process.env.PORT || 8080;

// set up express app
let app = express();

// listen on port
app.listen(port, ()=>{
    initializeDB();
    console.log("Server listening on port", port);
});

// server about info
app.get('/', (req, res) => {
    let footer_port = "Server listening on port " + port + ".";
    let about_page_html = getAboutHTML(footer_port);
    res.send(about_page_html);
 });

// body parser to parse req body as json
app.use(
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json()
);

 // provide the api endpoints
 app.use(controller);
