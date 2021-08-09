<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT Queue_id, User_id, name from Queues WHERE name like ?");
$escapedName = mysqli_real_escape_string($link, $data->searchTerm);

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
    echo "<td><button onclick=\"joinQueue($row[0])\" type=\"button\" class=\"btn\" style=\"margin: 0;\">Join</button></td></tr>";

}

mysqli_stmt_close($stmt);


?>
