<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT Queues.Queue_id, Queues.User_id, Queues.name from AccessQueue, Queues where AccessQueue.Queue_id = Queues.Queue_id and AccessQueue.User_id=?");
$escapedName = mysqli_real_escape_string($link, $data);

mysqli_stmt_bind_param($stmt, "s", $escapedName);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt); 
echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Owner</th><th scope=\"col\">Name</th><th scope=\"col\"></th></tr></thead><tbody>";
$count = 0;
while ($row = $result->fetch_array(MYSQLI_NUM))
{
    $count += 1;
    echo "<tr><th scope=\"row\" class=\"align-middle\">$count</th>";
    echo "<td class=\"align-middle\">$row[1]</td>";
    echo "<td class=\"align-middle\">$row[2]</td>";
    echo "<td><button onclick=\"displayQueue($row[0])\" type=\"button\" class=\"btn\" style=\"margin: 0;\">View</button></td></tr>";
}

mysqli_stmt_close($stmt);


?>
