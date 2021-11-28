// globals
var qid;
var uid;

$(document).ready(function () {
    displayQueue(15);
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
                addHiddenSongs(queue_id);
                $(`#deleteQueue`).html(`<button class="btnRed btn" type="button" onclick="deleteQueue(${queue_id})">Delete Queue</button>`);
            }
            else {
                $(`#deleteQueue`).html(`<button class="btnRed btn" type="button" onclick="leaveQueue(${queue_id}, \'${uid}\')">Leave Queue</button>`);
            }

        },
        error: function (err) { console.log("ERROR"); }
    });
}