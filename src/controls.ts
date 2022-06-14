import fetch from "node-fetch";
import {Response, Request} from "express";
import * as fs from "fs";


function downloadFile(filename: string, res: Response) {
    const file = `${__dirname}/files/${filename}`;
    res.download(file);
}


export function protectedEpisode(req: Request, res: Response){
    downloadFile('Furresangen.mp3', res)
}

export function nonProtectedEpisode(req: Request, res: Response){
    downloadFile("ColorLine.mp3",res);
}

export function protectedEpisode2(req: Request, res: Response){
    downloadFile("ColorLine.mp3",res);
}

export function rss(req: Request, res: Response){
    const filePath = `${__dirname}/files/rss.xml`;
    fs.exists(filePath, function (exists) {
        if (exists) {
            res.writeHead(200, {
                "Content-Type": "application/xml"
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");
    });
}

export function profilePicture(req: Request, res: Response){
    downloadFile("profil.jpg",res);
}

export function episodePicture(req: Request, res: Response){
    downloadFile("cover.png",res);
}

export async function registrationPage(req: Request, res: Response) {
    const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`
    var options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            audience: process.env.AUDIENCE,
            grant_type:"client_credentials"
        })
    }

    const result = await fetch(url, options)
    const json = await result.json();
    const token = json['access_token'];

    res.send( `
        <div style="margin: 40px">
        <h1>Podcast Mock server</h1>
        <p>This is a server for testing purposes. A real podcastserver would require registration to get the authorization code.</p>
        <p>Copy the code and paste it into field to open up protected episodes</p>
        <button onclick="myFunction()" id="btn">Copy code</button><br>
        <textarea id="myInput" style="width: 700px; height: 200px">${token}</textarea>
        </div>
        <script>
            var btn = document.getElementById("btn");
            function myFunction() {
                btn.disabled = true;
                var copyText = document.getElementById("myInput");
                copyText.select();
                copyText.setSelectionRange(0, 999999); /* For mobile devices */
                navigator.clipboard.writeText(copyText.value);
                btn.innerHTML = "Copied code"
            }
        </script>`);
}
