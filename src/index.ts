import 'dotenv/config'
import express  from "express";
import {registrationPage, protectedEpisode, nonProtectedEpisode, profilePicture, rss} from "./controls";
import {checkJwt} from "./middleware";
var cors = require('cors')
const app = express();
const port = 8080; // default port to listen

app.use(cors())

app.get( "/", registrationPage );
app.get("/protected", checkJwt, protectedEpisode)
app.get("/open", nonProtectedEpisode)
app.get("/profile", profilePicture)
app.get("/rss", rss)


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
