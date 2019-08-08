import SpotifyWebApi from 'spotify-web-api-node';

  let credentials = {
    clientId: '9bc9cd6f229443d5b183b2111b3901b1',
    clientSecret: 'bae7ecaab37e4e57bb39258b26950092',
  }

  let spotifyApi = new SpotifyWebApi(credentials);

  let Spotify = {
    search : input => spotifyApi.searchTracks(input, {limit: 5}),

    recentPlaylist : () => spotifyApi.getFeaturedPlaylists({limit: 8}),

    relatedArtists : (id) => spotifyApi.getArtistRelatedArtists(id),

    artistTopTracks : (id) => spotifyApi.getArtistTopTracks(id, 'US'),

    setAccessToken : (token) => spotifyApi.setAccessToken(token),

    createPlaylist : (userId, playlistName, access) => spotifyApi.createPlaylist(userId, playlistName, {public: access}),

    addTracksToPlaylist : (userId, playlistId, tracks) => {
      let uri = tracks.map((song) => song.uri);
      return spotifyApi.addTracksToPlaylist(playlistId, uri);
    },

    getCurrentUser: () => spotifyApi.getMe(),

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
            tracks = tracks.filter((song) => {if(song.preview_url){return song}})
            tracks.sort((a, b) => b.popularity-a.popularity)
            console.log('tracks', tracks.slice(0,30));
            resolve(tracks.slice(0, 30));  
          })
        }).catch((err) => {
          reject(err);
        })
      })
    }
  }

  export default Spotify;