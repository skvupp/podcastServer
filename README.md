# Podcast with authorization
This is a REST API made with Nodejs and Express to demonstrate how to put authorization on podcast episodes and still use open standards.

The goal is to create applications with both open podcasts and podcasts that demand paid subscriptions.

This is a mock server to be used with podcastplayer at [https://github.com/skvupp/podcastplayer](https://github.com/skvupp/podcastplayer). 
You shoud clone this to test the API.

## API
This API contains a mock podcast with RSS, episodes and images.

| Enpdoints   | Description                                       |
|-------------|---------------------------------------------------|
| /           | Page to get token                                 |
| /rss        | RSS for the podcast                               |
| /protected  | Audio file requires token authorization in header |
| /protected2 | Another audio file that requires token            |
| /open       | Open audio file without authorization             |
| /profile    | Profile picture                                   |
| /episode    | Episode picture                                   |

### RSS
The RSS is an XML-file with standarized elements.

| Element            | Description                                                                                                                                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| itunes:episodeType | This usually has three alternatives: full, bonus or teaser. On this podcast, some episodes have the value "protected", to tell the podcast player that this one nees authorization. The user will be prompted. |
| link               | The url to the episode page. In this case it leads to a registration case, where the user can register and get a token to open up episode.                                                                     |


## Setup
Create account on https://auth0.com/ Create an API. Create a .env file in the project root and fill in data:
```
AUTH0_DOMAIN=[accountname].eu.auth0.com
CLIENT_ID="[Client id of API]"
CLIENT_SECRET="[Client secret of API]"
AUDIENCE="[Audience of API]"
```

Run
```
npm install
```

## Start
```
npm start
```

## Next
Clone the player to test the podcast: [https://github.com/skvupp/podcastplayer](https://github.com/skvupp/podcastplayer)
