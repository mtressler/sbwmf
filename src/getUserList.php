<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
mysqli_select_db($link, 'sbwmf');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT User_id, role from AccessQueue where Queue_id=?");
mysqli_stmt_bind_param($stmt, "i", $data->queueId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$stmt2 = mysqli_prepare($link, "SELECT User_id, role from AccessQueue where Queue_id=? and User_id=?");
mysqli_stmt_bind_param($stmt2, "is", $data->queueId, $data->userId);
mysqli_stmt_execute($stmt2);
$result2 = mysqli_stmt_get_result($stmt2); 
$row2 = $result2->fetch_array(MYSQLI_NUM);

if (strcmp($row2[1], "owner") == 0) {
    echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">User</th><th scope=\"col\">Role</th><th scope=\"col\" class=\"centerText\">Demote to User</th><th scope=\"col\"class=\"centerText\">Promote to Admin</th><th scope=\"col\"class=\"centerText\">Give Ownership</th></tr></thead><tbody>";
}
else if (strcmp($row2[1], "admin") == 0) {
    echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">User</th><th scope=\"col\">Role</th><th scope=\"col\" class=\"centerText\">Demote to User</th><th scope=\"col\"class=\"centerText\">Promote to Admin</th><th scope=\"col\"class=\"centerText\"></th></tr></thead><tbody>";
}
else {
    echo "<table class=\"table table-hover\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">User</th><th scope=\"col\">Role</th><th scope=\"col\" class=\"centerText\"></th><th scope=\"col\"class=\"centerText\"></th><th scope=\"col\"class=\"centerText\"></th></tr></thead><tbody>";
}

$count = 0;
while ($row = $result->fetch_array(MYSQLI_NUM)) 
{
    $count += 1;
    echo "<tr><th scope=\"row\" class=\"align-middle\">$count</th>";
    echo "<td class=\"align-middle\">$row[0]</td>";
    echo "<td class=\"align-middle\">$row[1]</td>";

    if (strcmp($row[1], "owner") == 0 && strcmp($row2[1], "owner") == 0) {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
    }
    else if (strcmp($row[1], "admin") == 0 && strcmp($row2[1], "owner") == 0) {
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-red w3-ripple\" onclick=\"demoteUser('$row[0]', $data->queueId)\">-</button></td>";
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple\" onclick=\"giveOwnership('$row[0]', $data->queueId)\">+</button></td>";
    }
    else if (strcmp($row[1], "user") == 0 && strcmp($row2[1], "owner") == 0) {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple\" onclick=\"promoteAdmin('$row[0]', $data->queueId)\">+</button></td>";
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple\" onclick=\"giveOwnership('$row[0]', '$row2[0]', $data->queueId)\">+</button></td>";
    }
    else if (strcmp($row[1], "owner") == 0 && strcmp($row2[1], "admin") == 0) {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
    }
    else if (strcmp($row[1], "admin") == 0 && strcmp($row2[1], "admin") == 0) {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
    }
    else if (strcmp($row[1], "user") == 0 && strcmp($row2[1], "admin") == 0) {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"><button class=\"w3-button w3-circle w3-green w3-ripple\" onclick=\"promoteAdmin('$row[0]', $data->queueId)\">+</button></td>";
        echo "<td class=\"align-middle centerText\"></td>";
    }
    else {
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
        echo "<td class=\"align-middle centerText\"></td>";
    }

}

mysqli_stmt_close($stmt);

?>