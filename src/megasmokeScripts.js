// globals
var qid = 15;
var uid;

$(document).ready(function () {
    displayQueue(15);
    api_call('https://api.spotify.com/v1/me').then((res) => {
        uid = res['id'];
        document.getElementById("login").innerHTML = "Logged In";

        var accessObj = new Object();
        accessObj['userId'] = res['id'];
        accessObj['queueId'] = 15;
        accessObj['role'] = "user";

        $.ajax({
            type: 'POST',
            url: 'getRole.php',
            data: { 'data': JSON.stringify(accessObj) },
            success: function (result) {
                if (!result) {
                    console.log("Joining Queue");
                    joinQueue(15);
                }
                console.log(result);
            },
            error: function (err) { console.log("ERROR"); }
        });

    }).catch((err) => {
        document.getElementById("login").innerHTML = err;
    });


})

function displayQueue(queue_id) {
    qid = queue_id;

    $(`#manageUsers`).html(`<button class="btn" type="button" onclick="getUserList(${queue_id}, \'${uid}\')">Manage Users</button>`);
    $(`#refreshQueue`).html(`<button class="btn" type="button" onclick="displayQueue(${queue_id})">Refresh</button>`);

    var message = `
        <form class="form-inline" onSubmit="return false;">
            <div class="form-group" style="margin: 20px 20px 0px 20px;"><input type="text" id="searchSongName" class="form-control" placeholder="Search for a song to add"></div>
            </div>
            <button type="submit" class="btn" onclick="searchForSong()">Search</button>
            <button class="btn" onclick="window.open('https://open.spotify.com/playlist/5P6FpFhMy7gFvYwaX1ABCj?si=70eed6d85ffb45f3','_blank')">View Playlist</button>
        </form>
    `;

    $(`#songQueueSearch`).html(message);

    var queue_id_obj = new Object();
    queue_id_obj['queueId'] = queue_id;
    queue_id_obj['userId'] = uid;

    var role;

    $.ajax({
        type: 'POST',
        url: 'displayQueue.php',
        data: { 'data': JSON.stringify(queue_id_obj) },
        success: function (result) {
            var newRes = result.split("\n");
            role = newRes[0];
            document.getElementById("queueResult").innerHTML = newRes[1];

            if (role == '\'owner\'') {
                $(`#deleteQueue`).html(`<button class="btnRed btn" type="button" onclick="deleteQueue(${queue_id})">Delete Queue</button>`);
            }
            else {
                $(`#deleteQueue`).html(`<button class="btnRed btn" type="button" onclick="leaveQueue(${queue_id}, \'${uid}\')">Leave Queue</button>`);
            }

        },
        error: function (err) { console.log("ERROR"); }
    });
}

function searchForSong() {
    var message = `
        <table class="table table-hover"><thead><tr>
        <th scope="col">Cover</th>
        <th scope="col">Name</th>
        <th scope="col">Artist</th>
        <th scope="col"></th>
        </tr></thead><tbody>
    `;

    var name = document.getElementById("searchSongName").value;
    var endpoint = 'https://api.spotify.com/v1/search?q=' + name + '&type=track' + '&limit=50';
    api_call(endpoint).then((res) => {
        res['tracks']['items'].forEach(el => {
            var artistString = "";
            el['artists'].forEach(art => {
                artistString += " " + art['name'] + ',';
            })
            artistString = artistString.slice(1, -1);
            message += `<tr>`;
            message += "<td class=\"align-middle\"><img src=\"" + el['album']['images'][2]['url'] + "\" alt=\"album cover\"></td>";
            message += `<td class="align-middle">` + el['name'] + `</td>`
            message += `<td class="align-middle">` + artistString + `</td>`
            message += '<td class=\"align-middle\"><button class=\"btn\" type=\"button\" onclick=\"addSongToQueue(\'' + el['uri'] + '\')">Add</button></td>';
            message += `</tr>`;
        })
        message += `</tbody></table>`;
        $(`#songQueueResults`).html(message);
    })

}

function api_call(url, type = "GET") {
    console.log(url);
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
        success: function (response) {
            return response;
        }
    })
}

function addSongToQueue(uri) {
    saveSong(uri);
    var obj = new Object();
    obj['uri'] = uri;
    obj['queue_id'] = qid;

    api_call('https://api.spotify.com/v1/me').then((res) => {
        obj['uid'] = res['id'];

        $.ajax({
            type: 'POST',
            url: 'addSongToQueue.php',
            data: { 'data': JSON.stringify(obj) },
            success: function (result) {
            },
            error: function (err) { console.log("ERROR"); }
        });
        $(`#songQueueSearch`).empty();
        $(`#songQueueResults`).empty();
    }).catch((err) => {
        console.log(err);
    });
}

function saveSong(uri) {
    var endpoint = 'https://api.spotify.com/v1/tracks/' + uri.split(':')[2];
    api_call(endpoint).then((res) => {
        endpoint = 'https://api.spotify.com/v1/audio-features/' + uri.split(':')[2];
        api_call(endpoint).then((res2) => {
            ob = { 'audio_features': [res2] }
            ob['audio_features'][0]['name'] = res['name'];
            ob['audio_features'][0]['popularity'] = res['popularity'];
            ob['audio_features'][0]['track_num'] = res['track_number'];
            var artists = "";
            var first = true;
            res['artists'].forEach(a => {
                if (first)
                    first = false;
                else
                    artists += ", ";
                artists += a['name'];
            });
            ob['audio_features'][0]['artists'] = artists;

            $.ajax({
                type: 'POST',
                url: 'saveSongs.php',
                data: { 'data': JSON.stringify(ob) },
                success: function (result) {
                    displayQueue(qid);
                },
                error: function (err) { console.log("ERROR"); }
            });
        }).catch((err1) => {
            console.log("Error: " + err1);
        });

    }).catch((err) => {
        console.log("Error: " + err);
    });
}

function addVote(uri, queueId, userId) {

    var obj = new Object;
    obj['uri'] = uri;
    obj['queueId'] = queueId;
    obj['userId'] = userId;

    console.log(obj);

    $.ajax({
        type: 'POST',
        url: 'addVote.php',
        data: { 'data': JSON.stringify(obj) },
        success: function (result) {
        },
        error: function (err) { console.log("ERROR"); }
    });

    displayQueue(queueId);
}

function removeVote(uri, queueId, userId) {

    var obj = new Object;
    obj['uri'] = uri;
    obj['queueId'] = queueId;
    obj['userId'] = userId;

    console.log(obj);

    $.ajax({
        type: 'POST',
        url: 'removeVote.php',
        data: { 'data': JSON.stringify(obj) },
        success: function (result) {
        },
        error: function (err) { console.log("ERROR"); }
    });

    displayQueue(queueId);
}

function addToSpotify(uri, queueId) {

    var accessObj = new Object();
    accessObj['userId'] = uid;
    accessObj['queueId'] = queueId;
    var role;

    console.log(accessObj);

    $.ajax({
        type: 'POST',
        url: 'getRole.php',
        data: { 'data': JSON.stringify(accessObj) },
        success: function (result) {
            console.log(result);
            role = result;
        },
        error: function (err) { console.log("ERROR"); }
    });

    console.log(uri);


    var endpoint = 'https://api.spotify.com/v1/playlists/5P6FpFhMy7gFvYwaX1ABCj/tracks?uris=' + uri;

    console.log(endpoint);


    console.log("owner part");

    api_call(endpoint, type = "POST").then((res) => {
        console.log(res);

    }).catch((err) => {
        console.log(err);
    });

    removeFromQueue(uri, queueId);
}

function removeFromQueue(uri, queueId) {

    var obj = new Object;
    obj['uri'] = uri;
    obj['queueId'] = queueId;

    $.ajax({
        type: 'POST',
        url: 'removeFromQueue.php',
        data: { 'data': JSON.stringify(obj) },
        success: function (result) {
            displayQueue(queueId);
        },
        error: function (err) {
            displayQueue(queueId);
            console.log("ERROR");
        }
    });
}

function joinQueue(queue_id) {
    console.log(queue_id);

    api_call('https://api.spotify.com/v1/me').then((res) => {

        var accessObj = new Object();
        accessObj['userId'] = res['id'];
        accessObj['queueId'] = queue_id;
        accessObj['role'] = "user";

        $.ajax({
            type: 'POST',
            url: 'addAccess.php',
            data: { 'data': JSON.stringify(accessObj) },
            success: function (result) {
                console.log(result);
                console.log("SUCCESS");
                displayQueue(queue_id);
            },
            error: function (err) { console.log("ERROR"); }
        });
    }).catch((err) => {
        console.log(err);
    });
}
