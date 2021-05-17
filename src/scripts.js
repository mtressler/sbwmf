$(document).ready(function() {
    if (!localStorage['token']) {
        updateToken();
    }
    
    startOperation();
})



function updateToken() {
    let url = new URL(window.location.href);
    url = url.toString();
    let s = url.search("access_token=");
    if (s == -1)
        return;
    let e = url.search('&');
    var token = url.substring(s+13, e)
    console.log(token);
    var d = new Date();
    var tokExpiry = {
        tok: token,
        expiry: d.getTime() + 3600000
    }
    localStorage['token'] = JSON.stringify(tokExpiry);
}

function startOperation() {
    var update;
    update = setInterval(updateCurrentSong, 1000);
}

var lastPlayedSong;

function updateCurrentSong() {
    api_call('https://api.spotify.com/v1/me/player/currently-playing').then( (res) => {
        if (res['item']['name']) {
            document.getElementById("currentSong").innerHTML = res['item']['name'];
            lastPlayedSong = res['item']['name'];
        }
        else {
            document.getElementById("currentSong").innerHTML = lastPlayedSong;
        }
    }).catch((err) => {
        console.log(err);
    });
}

function testUserInfo() {
    api_call('https://api.spotify.com/v1/me').then( (res) => {
        var name = JSON.stringify(res['display_name']);
        name = name.substring(1, name.length-1);
        document.getElementById("userInfo").innerHTML = "Welcome " + name + "!";
    }).catch((err) => {
        document.getElementById("userInfo").innerHTML = err;
    });
}

function newReleases() {
    api_call('https://api.spotify.com/v1/browse/new-releases').then( (res) => {
        var obj = res['albums']['items'];
        var album = `
        <table class="table table-hover" ><thead><tr>
        <th scope="col">Album Name</th>
        <th scope="col">Artist</th>
        <th scope="col">Cover</th>
        </tr></thead><tbody>
        `;
        var i;
        for (i = 0; i < obj.length; i++) {
            album += "<tr>";

            var name = JSON.stringify(obj[i]['name']);
            name = name.substring(1, name.length-1);
            album += `<td class="align-middle">` + name + `</td>`;
            
            var artist = JSON.stringify(obj[i]['artists'][0]['name']);
            var artist = artist.substring(1, artist.length-1);
            album += `<td class="align-middle">` + artist + `</td>`;

            album += "<td class=\"align-middle\"><img src=\"" + obj[i]['images'][0]['url'] + "\" width=\'70\' height=\'70\'>" + `</td>`;
            album += "</tr>";
        }
        document.getElementById("newReleases").innerHTML = album;
        
    }).catch((err) => {
        document.getElementById("newReleases").innerHTML =  JSON.stringify(err);
    });
}
/*
 *  SAVING DATA
 */

function saveProfile() {
    saveUser();
    loadUserAlbums();
    saveAlbums();
    saveSongs();
    savePlaylists();
}

function saveUser() {
    var user = {
        'User_id': '',
        'user_uri': ''
    }
    api_call('https://api.spotify.com/v1/me').then( (res) => {
        var name = JSON.stringify(res['display_name']);
        name = name.substring(1, name.length-1);
        document.getElementById("userInfo").innerHTML = "Welcome " + name + "!";
        user['User_id'] = name;
        user['user_uri'] = res['uri'];
        console.log(JSON.stringify(user));
        $.ajax({
            type: 'POST',
            url: 'saveUser.php',
            data: {'data': JSON.stringify(user)},
            success: function (result) {
                console.log(result); 
                console.log("SUCCESS");
            },
            error: function (err) {console.log("ERROR");}
        });
    }).catch((err) => {
        document.getElementById("userInfo").innerHTML = err;
    });

}

function loadUserAlbums() {
    function appendAlbum(v) {
        
    }
    api_call('https://api.spotify.com/v1/me/albums').then( (res) => {
        res['items'].forEach(appendAlbum);
        document.getElementById("albums").innerHTML = JSON.stringify(res);
    }).catch((err) => {
        document.getElementById("albums").innerHTML = err;
    });
}

function saveSeveralSongs(uris, n, p, t, a) {
    var endpoint = 'https://api.spotify.com/v1/audio-features?ids=' + uris;
    api_call(endpoint).then( (res) => {
        var ob = res;
        var i;
        for (i = 0; i < ob['audio_features'].length; i++) {
            ob['audio_features'][i]['name'] = n.split('&%&')[i];
            ob['audio_features'][i]['popularity'] = parseInt(p.split('&')[i]);
            ob['audio_features'][i]['track_num'] = parseInt(t.split('&')[i]);
            ob['audio_features'][i]['artists'] = a.split('&%&')[i];
        }
        //console.log(ob);
        $.ajax({
            type: 'POST',
            url: 'saveSongs.php',
            data: {'data': JSON.stringify(ob)},
            success: function (result) {
                //console.log(result); 
                //console.log("SUCCESS");
            },
            error: function (err) {console.log("ERROR");}
        });
    }).catch((err) => {
        document.getElementById("songs").innerHTML = err;
    });
}

function saveSongs(offset=0, limit=50) {
    var endpoint = 'https://api.spotify.com/v1/me/tracks?offset=' + offset + '&limit=' + limit;
    api_call(endpoint).then( (res) => {
        //console.log(JSON.stringify(res));
        //console.log(res);
        if (res['items'].length == 50)
            saveSongs(offset=offset+50);
        var ids = "";
        var names = "";
        var popularity = "";
        var track_num = "";
        var artists = "";
        res['items'].forEach(el => {
            ids += el['track']['uri'].split(':')[2];
            ids += ',';
            names += el['track']['name'] + '&%&';
            popularity += el['track']['popularity'] + '&';
            track_num += el['track']['track_number'] + '&';
            var first = true;
            el['track']['artists'].forEach(a => {
                if (first)
                    first = false;
                else
                    artists += ", ";
                artists += a['name'];
            });
            artists += "&%&";
        })
        saveSeveralSongs(ids, names, popularity, track_num, artists);
        
    }).catch((err) => {
        document.getElementById("songs").innerHTML = err;
    });
}

function getMultipleTracks(uris) {
    var endpoint = 'https://api.spotify.com/v1/tracks?ids=' + uris;
    //console.log(`uris`, uris);
    api_call(endpoint).then( (res) => {
        //console.log(JSON.stringify(res));
        var ids = "";
        var names = "";
        var popularity = "";
        var track_num = "";
        var artists = "";
        res['tracks'].forEach(el => {
            ids += el['uri'].split(':')[2];
            ids += ',';
            names += el['name'] + '&%&';
            popularity += el['popularity'] + '&';
            track_num += el['track_number'] + '&';
            var first = true;
            el['artists'].forEach(a => {
                if (first)
                    first = false;
                else
                    artists += ", ";
                artists += a['name'];
            });
            artists += "&%&";
        })
        saveSeveralSongs(ids, names, popularity, track_num, artists);
        
    }).catch((err) => {
        document.getElementById("songs").innerHTML = err;
        console.log(`uris`, uris);
        
    });
}

/*
function saveAlbumSongs(id, offset=0, limit=50) {
    var endpoint = 'https://api.spotify.com/v1/albums/' + id + '/tracks?offset=' + offset + '&limit=' + limit;
    api_call(endpoint).then( (res) => {
        console.log(JSON.stringify(res));
        console.log(res);
        $.ajax({
            type: 'POST',
            url: 'saveSongs.php',
            data: {'data': JSON.stringify(res)},
            success: function (result) {console.log("SUCCESS");console.log(result.split('&')[0])},
            error: function (err) {console.log("ERROR");console.log(err)}
        });
    }).catch((err) => {
        document.getElementById("songs").innerHTML = err;
    });
}
*/
function saveAlbums(offset=0, limit=50) {
    var endpoint = 'https://api.spotify.com/v1/me/albums?offset=' + offset + '&limit=' + limit;
    api_call(endpoint).then( (res) => {
        //console.log(res);
        // check when num albums is exactly 50
        $.ajax({
            type: 'POST',
            url: 'saveAlbums.php',
            data: {'data': JSON.stringify(res)},
            success: function (result) {
                //console.log("SUCCESS");
                var r = result.split('&')[0];
                var i;
                for (i = 1; i <= r; i++) {
                    //console.log(`in success album`, result.split('&')[i]);
                }
                //console.log(r);
                if(r == 50)
                    saveAlbums(offset=offset+50)
            },
            error: function (err) {console.log("ERROR");console.log(err)}
        });

        //console.log(`after ajax res`, res);

        var count = 0;
        res['items'].forEach(el => { 
            
            var ids = [];
            
            el["album"]["tracks"]["items"].forEach(tr => { 
            
                if (ids.push(tr['uri'].split(':')[2]) == 50) {
                    var idStr = "";

                    ids.forEach(id => {
                        idStr += id;
                        idStr += ","
                    })

                    idStr = idStr.slice(0, idStr.length - 1);

                    setTimeout(() => { getMultipleTracks(idStr) }, 400 * count);
                    count++;

                    ids = [];

                }

            })
            var idStr = "";

            ids.forEach(id => {
                idStr += id;
                idStr += ","
            })

            idStr = idStr.slice(0, idStr.length - 1);

            setTimeout(() => { getMultipleTracks(idStr) }, 400 * count);
            count++;
        })

    }).catch((err) => {
        document.getElementById("albums").innerHTML = err;
    });
}

function savePlaylists(offset=0, limit=50) {
    var endpoint = 'https://api.spotify.com/v1/me/playlists?offset=' + offset + '&limit=' + limit;
    api_call(endpoint).then( (res) => {
        //console.log(res);
        $.ajax({
            type: 'POST',
            url: 'savePlaylists.php',
            data: {'data': JSON.stringify(res)},
            success: function (result) {
                //console.log(result);
                // 'result' is the php response
                /*var r = result.split('&')[0];
                var i;
                for (i = 1; i <= r; i++) {
                    console.log(`in success album`, result.split('&')[i]);
                }*/
            },
            error: function (err) {console.log("ERROR");console.log(err)}
        });

        var count = 1;

        res['items'].forEach(el => {
            setTimeout(() => {savePlaylistTracks(el["id"])}, 300*count);
            count += Math.ceil(el['tracks']['total'] / 100.);
            //console.log(count);
        })

        if(res['total'] > 50 && offset < res['total'])
            setTimeout(() => {console.log("RECURSING");savePlaylists(offset=offset+50)}, 300*count);
        else
            console.log("DONE LOADING PLAYLISTS");
    });

    
}

function savePlaylistTracks(id, offset=0, limit=100) {
    var endpoint = 'https://api.spotify.com/v1/playlists/' + id + '/tracks?offset=' + offset + '&limit=' + limit;
    //console.log("Saving playlist: " + id);
    api_call(endpoint).then( (res) => {
        //console.log(res);
        if (res["items"].length == 100) {
            savePlaylistTracks(id, offset+100);
        }

        var ids = "";
        var names = "";
        var popularity = "";
        var track_num = "";
        var artists = "";
        res['items'].forEach(el => {
            ids += el['track']['uri'].split(':')[2];
            ids += ',';
            names += el['track']['name'] + '&%&';
            popularity += el['track']['popularity'] + '&';
            track_num += el['track']['track_number'] + '&';
            var first = true;
            el['track']['artists'].forEach(a => {
                if (first)
                    first = false;
                else
                    artists += ", ";
                artists += a['name'];
            });
            artists += "&%&";
        })
        saveSeveralSongs(ids, names, popularity, track_num, artists);
    })
}

function resumeSong() {
    var body = {
        "context_uri": "spotify:track:002P2TvVReTSR0q2wqp9Nn",
        "offset": {
            "position": 5
        },
        "position_ms": 0
    }

    if (!localStorage['token']) {
        return Promise.reject("Not logged in.");
    } else {
        var tokStr = localStorage['token'];
        var tok = JSON.parse(tokStr);
        var d = new Date();
        if (d.getTime() > tok.expiry) {
            localStorage.removeItem('token');
            return Promise.reject("Session expired. Please log in again.");
        }
    }

    var device_id;

    api_call('https://api.spotify.com/v1/me/player/devices').then( (res) => {
        var obj = res['devices'];
        if (obj.length == 0) {
            console.log("no devices available");
            var message = `<p>Log in to Spotify on this device to enable playback</p>`;
            document.getElementById('warning').innerHTML = message;
        }
        else {
            document.getElementById('warning').innerHTML = "";
        }
        var i;
        for (i = 0; i < obj.length; i++) {
            if (obj[i]['type'] == 'Computer') {
                device_id = obj[i]['id'];
                console.log(device_id);
                obj = "";
            }
        }

        // play song
        $.ajax({
            type: "PUT",
            url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            json: {"data": JSON.stringify(body)},
            success: function(response) {
                console.log(JSON.stringify(response));
            }
        })
    }).catch((err) => {
        document.getElementById("warning").innerHTML = JSON.stringify(err);
    });

    console.log(device_id);
}

function pauseSong() {
    console.log("pauses");
    
    $.ajax({
        type: "PUT",
        url: "https://api.spotify.com/v1/me/player/pause",
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        }, 
        success: function(response) {
            console.log(response);
        }
    })
}

function nextSong() {
    $.ajax({
        type: "POST",
        url: "https://api.spotify.com/v1/me/player/next",
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        }, 
        success: function(response) {
            console.log(response);
        }
    })
}

function previousSong() {
    $.ajax({
        type: "POST",
        url: "https://api.spotify.com/v1/me/player/previous",
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        }, 
        success: function(response) {
            console.log(response);
        }
    })
}

var slider = document.getElementById("volume");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  changeVolume(this.value);
}

function changeVolume(volume) {
    $.ajax({
        type: "PUT",
        url: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + volume,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        }, 
        success: function(response) {
            console.log(response);
        }
    })
}

function api_call(url, type="GET") {
    if (!localStorage['token']) {
        return Promise.reject("Not logged in.");
    } else {
        var tokStr = localStorage['token'];
        var tok = JSON.parse(tokStr);
        var d = new Date();
        if (d.getTime() > tok.expiry) {
            localStorage.removeItem('token');
            return Promise.reject("Session expired. Please log in again.");
        }
    }

    return $.ajax({
        type: type,
        url: url,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        }, 
        success: function(response) {
            return response;
        }
    })
}
