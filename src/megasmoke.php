<!doctype html>
<html lang="en-us">
    <head>
        <link rel="icon" href="images/">
        <title>SBWMF</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" rel="stylesheet">
        <link href="styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="w3.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    </head>
    <body>
        <div id="page">
            <div id="right">
                <!-- navbar -->
                <div id="navbar-placeholder"></div>
                <script>$(function(){$("#navbar-placeholder").load("navbar.html");});</script>
                <a href='https://accounts.spotify.com/authorize?client_id=48b841ef44774ded93e4a2e1bffa9819&redirect_uri=http://www.sbwmf.com/&scope=user-read-private%20user-read-email%20user-library-read%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20user-modify-playback-state%20user-read-playback-state%20user-read-currently-playing&response_type=token'>
                    <button type="button" class="btn">Login</button>
                </a>

                <div id="songQueueSearch"></div>
                <div id="songQueueResults"></div>

                <div id="queueResult"></div>

            </div>
        </div>
        <div id="footer-placeholder"></div>
        <script>$(function(){$("#footer-placeholder").load("footer.html");});</script>
        
        <script src="scripts.js"></script>
        <script src="megasmokeScripts.js"></script>
    </body>
</html>
