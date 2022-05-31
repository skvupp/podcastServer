import 'dotenv/config'
import express  from "express";
import {registrationPage} from "./controls";
import {checkJwt} from "./middleware";
const app = express();
const port = 8080; // default port to listen

app.get( "/", registrationPage );
app.get("/hello", checkJwt, (req, res)=>res.send("hello"))

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
