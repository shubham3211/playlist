import SpotifyWebApi from 'spotify-web-api-node';

  let credentials = {
    clientId: '9bc9cd6f229443d5b183b2111b3901b1',
    clientSecret: 'bae7ecaab37e4e57bb39258b26950092',
    // redirectUri: 'http://localhost:3000/login/index.html'
  }
  
  let spotifyApi = new SpotifyWebApi(credentials);

  let Spotify = {
    search : input => spotifyApi.searchTracks(input, {limit: 5}),

    recentPlaylist : () => spotifyApi.getFeaturedPlaylists({limit: 8}),

    relatedArtists : (id) => spotifyApi.getArtistRelatedArtists(id),

    artistTopTracks : (id) => spotifyApi.getArtistTopTracks(id, 'US'),

    setAccessToken : (token) => spotifyApi.setAccessToken(token),

    makePlaylist : (song) => {
      return new Promise((resolve, reject) => {
        let tracks = [song];
        Spotify.relatedArtists(song.artists[0].id).then((connectedArtists) => {
          return connectedArtists.body.artists.map(artist => Spotify.artistTopTracks(artist.id))
        }).then((promises) => {
          Promise.all(promises).then(songs => {
            songs.forEach((song) => {
              tracks = [...tracks, ...song.body.tracks]
            })
            // tracks = tracks.filter((song, index, ar) => ar.indexOf(song)==index);
            tracks.sort((a, b) => b.popularity-a.popularity)
            console.log('tracks', tracks.slice(0,30));
            resolve(tracks.slice(0, 30));  
          })
        }).catch((err) => {
          reject(err);
        })
      })
    },

    // login: () => {
    //   return new Promise((resolve, reject) => {
    //     let url = spotifyApi.createAuthorizeURL(scopes, state);
    //     window.open(
    //       url,
    //       'Spotify',
    //       'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=500'
    //     );
    //     window.addEventListener('storage', (data) => {
    //       if (data.key === 'code') {
    //         spotifyApi.authorizationCodeGrant(data.newValue).then((res) => {
    //             console.log('The token expires in ' + res.body['expires_in']);
    //             console.log('The access token is ' + res.body['access_token']);
    //             console.log('The refresh token is ' + res.body['refresh_token']);
    //             spotifyApi.setAccessToken(res.body['access_token']);
    //             spotifyApi.setRefreshToken(res.body['refresh_token']);
    //             resolve();
    //           }
    //         ).catch((err) => {
    //           reject(err);
    //         })
    //       }
    //     });
    //   })
    // }
  }

  export default Spotify;