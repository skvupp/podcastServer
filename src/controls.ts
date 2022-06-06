import fetch from "node-fetch";
import {Response, Request} from "express";


function downloadFile(filename: string, res: Response) {
    const file = `${__dirname}/files/${filename}`;
    res.download(file);
}


export function protectedEpisode(req: Request, res: Response){
    downloadFile('test_pod.mp3', res)
}

export function nonProtectedEpisode(req: Request, res: Response){
    downloadFile("lydspor.mp3",res);
}

export function rss(req: Request, res: Response){
    downloadFile("rss.xml",res);
}

export function profilePicture(req: Request, res: Response){
    downloadFile("profil.jpg",res);
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
        <h1>Podcast Test server</h1>
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
