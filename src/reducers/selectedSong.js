import {SELECTED_SONG} from '../constants';

const addSelectedSong = (state =  {
  "album" : {
    "album_type" : "single",
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/5WDOfX1nri8iUmYpuGBye9"
      },
      "href" : "https://api.spotify.com/v1/artists/5WDOfX1nri8iUmYpuGBye9",
      "id" : "5WDOfX1nri8iUmYpuGBye9",
      "name" : "Eddie Summer",
      "type" : "artist",
      "uri" : "spotify:artist:5WDOfX1nri8iUmYpuGBye9"
    } ],
    "available_markets" : [ "AD", "AE", "AR", "AT", "AU", "BE", "BG", "BH", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JO", "JP", "KW", "LB", "LI", "LT", "LU", "LV", "MA", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "OM", "PA", "PE", "PH", "PL", "PS", "PT", "PY", "QA", "RO", "SA", "SE", "SG", "SK", "SV", "TH", "TN", "TR", "TW", "US", "UY", "VN", "ZA" ],
    "external_urls" : {
      "spotify" : "https://open.spotify.com/album/3mtoxqfyHXMwlPTORkiybW"
    },
    "href" : "https://api.spotify.com/v1/albums/3mtoxqfyHXMwlPTORkiybW",
    "id" : "3mtoxqfyHXMwlPTORkiybW",
    "images" : [ {
      "height" : 600,
      "url" : "https://i.scdn.co/image/4b7abb8a5588755aece4a31f42ec1fb8cbc7e18b",
      "width" : 600
    }, {
      "height" : 300,
      "url" : "https://i.scdn.co/image/20a21dcbb1cd02aa47861daef04bb5c28d69c6b4",
      "width" : 300
    }, {
      "height" : 64,
      "url" : "https://i.scdn.co/image/9c3bd4ebd71e42515a73a434ee9810f30bfc284d",
      "width" : 64
    } ],
    "name" : "Shape of You",
    "release_date" : "2017-01-27",
    "release_date_precision" : "day",
    "total_tracks" : 1,
    "type" : "album",
    "uri" : "spotify:album:3mtoxqfyHXMwlPTORkiybW"
  }}, action) => {
  switch(action.type) {
    case SELECTED_SONG:
      return action.payload
    default:
      return state
  }
}

export default addSelectedSong;