<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
mysqli_select_db($link, 'sbwmf');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT Queue_id, Name, Artist, queue.vote, queue.song_uri from Songs, (SELECT Queue_id, song_uri, count(User_id) as vote from Enqueue where Queue_id=? group by Queue_id, song_uri order by count(User_id) DESC) queue where Songs.Song_uri=queue.song_uri order by vote DESC, Name;");
mysqli_stmt_bind_param($stmt, "i", $data->queueId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt); 

$stmt3 = mysqli_prepare($link, "SELECT role from AccessQueue where Queue_id=? and User_id=?");
mysqli_stmt_bind_param($stmt3, "is", $data->queueId, $data->userId);
mysqli_stmt_execute($stmt3);
$result3 = mysqli_stmt_get_result($stmt3); 
$row3 = $result3->fetch_array(MYSQLI_NUM);

var_export($row3[0]);
echo "\n";

if (strcmp($row3[0], "user") == 0) {
    echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Song Title</th><th scope=\"col\">Artist</th><th scope=\"col\" class=\"centerText\">Vote Count</th><th scope=\"col\" class=\"centerText\">Vote For Song</th><th scope=\"col\"></th><th scope=\"col\"></th></tr></thead><tbody>";
}
else {
    echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Song Title</th><th scope=\"col\">Artist</th><th scope=\"col\" class=\"centerText\">Vote Count</th><th scope=\"col\" class=\"centerText\">Vote For Song</th><th scope=\"col\" class=\"centerText\">Approve/Deny Song</th><th scope=\"col\"></th></tr></thead><tbody>";
}

$count = 0;
while ($row = $result->fetch_array(MYSQLI_NUM))
{
    $stmt4 = mysqli_prepare($link, "SELECT User_id from Enqueue where Queue_id=? and song_uri=? and User_id=?");
    mysqli_stmt_bind_param($stmt4, "iss", $row[0], $row[4], $data->userId);
    mysqli_stmt_execute($stmt4);
    $result4 = mysqli_stmt_get_result($stmt4); 
    
    $count += 1;
    echo "<tr><th scope=\"row\" class=\"align-middle\">$count</th>";
    echo "<td class=\"align-middle\">$row[1]</td>";
    echo "<td class=\"align-middle\">$row[2]</td>";
    echo "<td class=\"align-middle centerText\">$row[3]</td>";
    
    $row4 = $result4->fetch_array(MYSQLI_NUM);

    if (is_null($row4)) {
        
                                                                                                                               // uri     queueId       userId        
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple\" onclick=\"addVote('$row[4]', $row[0], '$data->userId')\">+</button></td>";
    }
    else {
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-red w3-ripple\" onclick=\"removeVote('$row[4]', $row[0], '$data->userId')\">-</button></td>";
    }
                                                                                                                            
    if (strcmp($row3[0], "user") != 0) {
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple mR2\" onclick=\"addToSpotify('$row[4]', $row[0])\">&#10003</button><button class=\"w3-button w3-circle w3-red w3-ripple mL2\" onclick=\"removeFromQueue('$row[4]', $row[0])\">x</button></td>";
    }

    echo "</td>";
}

mysqli_stmt_close($stmt);


?>