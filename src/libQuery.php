<?php
    $link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
    ', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
    mysqli_select_db($link, 'sbwmf');
    $query = $_POST['query'];
    $results = mysqli_query($link, $query) or die ('Query failed');
    $print = true;
    if (in_array("Song_uri", $_POST['headers']))
        $print = false;
    if ($print) {
        echo "<table class=\"table\">";
        echo "<thead><tr>";
        echo "<th scope=\"col\">#</th>";
    }
    $index = 0;
    $img_index = -1;
    foreach ($_POST['headers'] as $h) {
        if ($print)
            echo "<th scope=\"col\">$h</th>";
        if ($h == 'Image')
            $img_index = $index;
        $index += 1;
    }
    if ($print)
        echo "</tr></thead><tbody>";
    $row = 0;
    while ($tuple = $results->fetch_array(MYSQLI_ASSOC)) {
        $row += 1;
        $col = 0;
        if ($print)
            echo "<tr><th scope=\"row\">$row</th>";
        foreach ($tuple as $val) {
            if ($col == $img_index && $print) {
                echo "<td><img src=\"$val\" alt=\"image file\" style=\"height: 5em; width: 5em;\"></td>";
            } else if ($print) {
                echo "<td>$val</td>";
            } else {
                echo "$val";
                echo "#%&#%&";
            }
            $col += 1;
        }
        if ($print)
            echo "</tr>";
    }
?>
