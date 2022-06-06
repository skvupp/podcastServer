import 'dotenv/config'
import express  from "express";
import {registrationPage, protectedEpisode, nonProtectedEpisode, profilePicture, rss} from "./controls";
import {checkJwt} from "./middleware";
import {base64} from "./soundtest";
var cors = require('cors')
const app = express();
const port = 8080; // default port to listen

app.use(cors())

app.get( "/", registrationPage );
app.get("/protected", checkJwt, protectedEpisode)
app.get("/open", nonProtectedEpisode)
app.get("/profile", profilePicture)
app.get("/rss", rss)
app.get("/test", (req, res)=>{
    res.send(`<audio autobuffer="autobuffer" autoplay="autoplay" controls type="audio/mpeg">
    <source src="data:audio/mpeg;base64,${base64}"/></audio>`)
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
