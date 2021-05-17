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
        <link href="nouislider.min.css" rel="stylesheet" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    </head>
    <body>


        <div id="page">
            <div id="left">
                <!-- sidebar -->
                <div class="sidenav">
                    <a href="#link">Friend1</a>
                    <a href="#link">Friend2</a>
                    <a href="#link">Friend3</a>
                </div>
            </div>

            <div id="right">
                <!-- navbar -->
                <div id="navbar-placeholder"></div>
                <script>$(function(){$("#navbar-placeholder").load("navbar.html");});</script>

                <!-- sliders/filters -->
                <div id="library-header">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="songRadio">
                        <label class="form-check-label" for="songRadio"><h4>Songs</h4></label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="albumRadio">
                        <label class="form-check-label" for="albumRadio"><h4>Albums</h4></label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="playlistRadio">
                        <label class="form-check-label" for="playlistRadio"><h4>Playlists</h4></label>
                    </div>
                </div>

                <h4 class="text-center library-header">Filters</h4>

                <div id="sliders-group">
                    <!-- Songs, Albums, and Playlists -->
                    <div id="name-regex-group" class="regex-group">
                        <div class="regex-group-label">Name:</div>
                        <input type="text" placeholder="Contains..." id="name-input" class="form-control">
                    </div>

                    <!-- Songs and Albums -->
                    <div id="popularity-slider-group" class="slider-group">
                        <div class="slider-group-label">Popularity:</div>
                        <input type="number" min="0" max="100" step="1" id="popularity-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="popularity-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="popularity-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="artist-regex-group" class="regex-group">
                        <div class="regex-group-label">Artist:</div>
                        <input type="text" placeholder="Contains..." id="artist-input" class="form-control">
                    </div>

                    <!-- Albums -->
                    <div id="release-date-slider-group" class="slider-group">
                        <div class="slider-group-label">Release date:</div>
                        <input type="date" min="0" max="100" step="1" id="release-date-input-low" class="form-control slider-group-inline slider-wide">
                        <div class="slider-group-inline my-slider">
                            <div id="release-date-slider"></div>
                        </div>
                        <input type="date" min="0" max="100" step="1" id="release-date-input-high" class="form-control slider-group-inline slider-wide">
                    </div>

                    <div id="genre-regex-group" class="regex-group">
                        <div class="regex-group-label">Genre:</div>
                        <input type="text" placeholder="Contains..." id="genre-input" class="form-control">
                    </div>

                    <!-- Playlists -->
                    <div id="description-regex-group" class="regex-group">
                        <div class="regex-group-label">Description:</div>
                        <input type="text" placeholder="Contains..." id="description-input" class="form-control">
                    </div>

                    <div id="track-count-slider-group" class="slider-group">
                        <div class="slider-group-label">Track count:</div>
                        <input type="number" min="0" max="1000000" step="1" id="track-count-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="track-count-slider"></div>
                        </div>
                        <input type="number" min="0" max="1000000" step="1" id="track-count-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="collaborative-switch-group" class="switch-group form-check form-switch">
                        <div class="switch-group-label">Collaborative:</div>
                        <select id="collaborative-input" aria-label="sort-collaborative" class="form-select">
                            <option selected value="either">Either</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div id="owner-user-id-regex-group" class="regex-group">
                        <div class="regex-group-label">Owner Spotify id:</div>
                        <input type="text" placeholder="Contains..." id="owner-user-id-input" class="form-control">
                    </div>

                    <!-- Songs -->
                    <div id="duration-slider-group" class="slider-group">
                        <div class="slider-group-label">Duration (s):</div>
                        <input type="number" min="0" max="3600" step="1" id="duration-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="duration-slider"></div>
                        </div>
                        <input type="number" min="0" max="3600" step="1" id="duration-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="track-num-slider-group" class="slider-group">
                        <div class="slider-group-label">Track number:</div>
                        <input type="number" min="0" max="100" step="1" id="track-num-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="track-num-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="track-num-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="key-slider-group" class="slider-group">
                        <div class="slider-group-label">Key:</div>
                        <input type="number" min="0" max="100" step="1" id="key-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="key-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="key-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="valence-slider-group" class="slider-group">
                        <div class="slider-group-label">Valence:</div>
                        <input type="number" min="0" max="100" step="1" id="valence-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="valence-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="valence-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="energy-slider-group" class="slider-group">
                        <div class="slider-group-label">Energy:</div>
                        <input type="number" min="0" max="100" step="1" id="energy-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="energy-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="energy-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="tempo-slider-group" class="slider-group">
                        <div class="slider-group-label">Tempo:</div>
                        <input type="number" min="0" max="100" step="1" id="tempo-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="tempo-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="tempo-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="liveness-slider-group" class="slider-group">
                        <div class="slider-group-label">Liveness:</div>
                        <input type="number" min="0" max="100" step="1" id="liveness-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="liveness-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="liveness-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="danceability-slider-group" class="slider-group">
                        <div class="slider-group-label">Danceability:</div>
                        <input type="number" min="0" max="100" step="1" id="danceability-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="danceability-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="danceability-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="loudness-slider-group" class="slider-group">
                        <div class="slider-group-label">Loudness:</div>
                        <input type="number" min="0" max="100" step="1" id="loudness-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="loudness-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="loudness-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="speechiness-slider-group" class="slider-group">
                        <div class="slider-group-label">Speechiness:</div>
                        <input type="number" min="0" max="100" step="1" id="speechiness-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="speechiness-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="speechiness-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="acousticness-slider-group" class="slider-group">
                        <div class="slider-group-label">Acousticness:</div>
                        <input type="number" min="0" max="100" step="1" id="acousticness-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="acousticness-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="acousticness-input-high" class="form-control slider-group-inline">
                    </div>

                    <div id="instrumentalness-slider-group" class="slider-group">
                        <div class="slider-group-label">Instrumentalness:</div>
                        <input type="number" min="0" max="100" step="1" id="instrumentalness-input-low" class="form-control slider-group-inline">
                        <div class="slider-group-inline my-slider">
                            <div id="instrumentalness-slider"></div>
                        </div>
                        <input type="number" min="0" max="100" step="1" id="instrumentalness-input-high" class="form-control slider-group-inline">
                    </div>
                </div>


                <h4 class="text-center library-header">Include</h4>
                <div id="library-include">
                    <div class="form-check" id="name-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-name">
                        <label class="form-check-label" for="checkbox-name">Name</label>
                    </div>
                    <div class="form-check" id="popularity-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-popularity">
                        <label class="form-check-label" for="checkbox-popularity">Popularity</label>
                    </div>
                    <div class="form-check" id="artist-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-artist">
                        <label class="form-check-label" for="checkbox-artist">Artist</label>
                    </div>
                    <div class="form-check" id="release-date-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-release-date">
                        <label class="form-check-label" for="checkbox-release-date">Release Date</label>
                    </div>
                    <div class="form-check" id="image-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-image">
                        <label class="form-check-label" for="checkbox-image">Image</label>
                    </div>
                    <div class="form-check" id="genre-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-genre">
                        <label class="form-check-label" for="checkbox-genre">Genre</label>
                    </div>
                    <div class="form-check" id="description-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-description">
                        <label class="form-check-label" for="checkbox-description">Description</label>
                    </div>
                    <div class="form-check" id="track-count-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-track-count">
                        <label class="form-check-label" for="checkbox-track-count">Track Count</label>
                    </div>
                    <div class="form-check" id="collaborative-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-collaborative">
                        <label class="form-check-label" for="checkbox-collaborative">Collaborative</label>
                    </div>
                    <div class="form-check" id="owner-spotify-id-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-owner-user-id">
                        <label class="form-check-label" for="checkbox-owner-user-id">Owner Spotify id</label>
                    </div>
                    <div class="form-check" id="track-num-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-track-num">
                        <label class="form-check-label" for="checkbox-track-num">Track Number</label>
                    </div>
                    <div class="form-check" id="duration-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-duration">
                        <label class="form-check-label" for="checkbox-duration">Duration</label>
                    </div>
                    <div class="form-check" id="key-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-key">
                        <label class="form-check-label" for="checkbox-key">Key</label>
                    </div>
                    <div class="form-check" id="energy-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-energy">
                        <label class="form-check-label" for="checkbox-energy">Energy</label>
                    </div>
                    <div class="form-check" id="liveness-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-liveness">
                        <label class="form-check-label" for="checkbox-liveness">Liveness</label>
                    </div>
                    <div class="form-check" id="loudness-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-loudness">
                        <label class="form-check-label" for="checkbox-loudness">Loudness</label>
                    </div>
                    <div class="form-check" id="valence-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-valence">
                        <label class="form-check-label" for="checkbox-valence">Valence</label>
                    </div>
                    <div class="form-check" id="tempo-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-tempo">
                        <label class="form-check-label" for="checkbox-tempo">Tempo</label>
                    </div>
                    <div class="form-check" id="danceability-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-danceability">
                        <label class="form-check-label" for="checkbox-danceability">Danceability</label>
                    </div>
                    <div class="form-check" id="speechiness-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-speechiness">
                        <label class="form-check-label" for="checkbox-speechiness">Speechiness</label>
                    </div>
                    <div class="form-check" id="instrumentalness-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-instrumentalness">
                        <label class="form-check-label" for="checkbox-instrumentalness">Instrumentalness</label>
                    </div>
                    <div class="form-check" id="acousticness-check">
                        <input class="form-check-input" type="checkbox" name="flexCheckDefault" id="checkbox-acousticness">
                        <label class="form-check-label" for="checkbox-acousticness">Acousticness</label>
                    </div>
                    
                </div>



                <h4 class="text-center library-header">Sort</h4>
                <div id="library-sort">
                    <div id="sort-songs">
                        <div id="sort-songs-first">
                            <h6>First</h6>
                            <select class="form-select" aria-label="sort-songs-first" id='ssf'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="Track_num">Track Number</option>
                                <option value="Duration">Duration</option>
                                <option value="S_Key">Key</option>
                                <option value="Energy">Energy</option>
                                <option value="Liveness">Liveness</option>
                                <option value="Loudness">Loudness</option>
                                <option value="Valence">Valence</option>
                                <option value="Tempo">Tempo</option>
                                <option value="Danceability">Danceability</option>
                                <option value="Speechiness">Speechiness</option>
                                <option value="Instrumentalness">Instrumentalness</option>
                                <option value="Acousticness">Acousticness</option>
                            </select>
                            <select class="form-select" aria-label="sort-songs-first-order" id='ssfo'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-songs-second">
                            <h6>Second</h6>
                            <select class="form-select" aria-label="sort-songs-second" id='sss'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="Track_num">Track Number</option>
                                <option value="Duration">Duration</option>
                                <option value="S_Key">Key</option>
                                <option value="Energy">Energy</option>
                                <option value="Liveness">Liveness</option>
                                <option value="Loudness">Loudness</option>
                                <option value="Valence">Valence</option>
                                <option value="Tempo">Tempo</option>
                                <option value="Danceability">Danceability</option>
                                <option value="Speechiness">Speechiness</option>
                                <option value="Instrumentalness">Instrumentalness</option>
                                <option value="Acousticness">Acousticness</option>
                            </select>
                            <select class="form-select" aria-label="sort-songs-second-order" id='ssso'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-songs-third">
                            <h6>Third</h6>
                            <select class="form-select" aria-label="sort-songs-third" id='sst'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="Track_num">Track Number</option>
                                <option value="Duration">Duration</option>
                                <option value="S_Key">Key</option>
                                <option value="Energy">Energy</option>
                                <option value="Liveness">Liveness</option>
                                <option value="Loudness">Loudness</option>
                                <option value="Valence">Valence</option>
                                <option value="Tempo">Tempo</option>
                                <option value="Danceability">Danceability</option>
                                <option value="Speechiness">Speechiness</option>
                                <option value="Instrumentalness">Instrumentalness</option>
                                <option value="Acousticness">Acousticness</option>
                            </select>
                            <select class="form-select" aria-label="sort-songs-third-order" id='ssto'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>

                    <div id="sort-albums">
                        <div id="sort-albums-first">
                            <h6>First</h6>
                            <select class="form-select" aria-label="sort-albums-first" id='saf'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="release_date">Release Date</option>
                                <option value="genre">Genre</option>
                            </select>
                            <select class="form-select" aria-label="sort-albums-first-order" id='safo'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-albums-second">
                            <h6>Second</h6>
                            <select class="form-select" aria-label="sort-albums-second" id='sas'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="release_date">Release Date</option>
                                <option value="genre">Genre</option>
                            </select>
                            <select class="form-select" aria-label="sort-albums-second-order" id='saso'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-albums-third">
                            <h6>Third</h6>
                            <select class="form-select" aria-label="sort-albums-third" id='sat'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="Popularity">Popularity</option>
                                <option value="Artist">Artist</option>
                                <option value="release_date">Release Date</option>
                                <option value="genre">Genre</option>
                            </select>
                            <select class="form-select" aria-label="sort-albums-third-order" id='sato'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>

                    <div id="sort-playlists">
                        <div id="sort-playlists-first">
                            <h6>First</h6>
                            <select class="form-select" aria-label="sort-playlists-first" id='spf'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="description">Description</option>
                                <option value="track_count">Track Count</option>
                                <option value="collaborative">Collaborative</option>
                                <option value="owner_user_id">Owner Spotify id</option>
                            </select>
                            <select class="form-select" aria-label="sort-playlists-first-order" id='spfo'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-playlists-second">
                            <h6>Second</h6>
                            <select class="form-select" aria-label="sort-playlists-second" id='sps'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="description">Description</option>
                                <option value="track_count">Track Count</option>
                                <option value="collaborative">Collaborative</option>
                                <option value="owner_user_id">Owner Spotify id</option>
                            </select>
                            <select class="form-select" aria-label="sort-playlists-second-order" id='spso'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div id="sort-playlists-third">
                            <h6>Third</h6>
                            <select class="form-select" aria-label="sort-playlists-third" id='spt'>
                                <option selected>-</option>
                                <option value="Name">Name</option>
                                <option value="description">Description</option>
                                <option value="track_count">Track Count</option>
                                <option value="collaborative">Collaborative</option>
                                <option value="owner_user_id">Owner Spotify id</option>
                            </select>
                            <select class="form-select" aria-label="sort-playlists-third-order" id='spto'>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>

                
                <h4 class="text-center library-header">Limit Results</h4>
                <div class="flex-wrapper">
                    <div id="limit-slider-group" class="slider-group">
                        <div class="slider-group-label">Show:</div>
                        <input type="number" min="0" max="1000000" step="1" id="limit-input" class="form-control slider-group-inline slider-medium">
                        <div class="slider-group-inline my-slider">
                            <div id="limit-slider"></div>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button type="button" class="btn" id="search-button" style="display: none;">Search</button>
                </div>

                <div class="text-center">
                    <button type="button" class="btn" id="save-playlist" style="display: none;">Save Results as a Playlist</button>
                </div>


                <!-- tables -->
                <div id="table-output" class="table-wrapper"></div>

                <br></br>
                <br></br>

            </div>
        </div>

        <div id="footer-placeholder"></div>
        <script>$(function(){$("#footer-placeholder").load("footer.html");});</script>

        <script src="nouislider.min.js"></script>
        <script src="libScripts.js"></script>
        <script src="scripts.js"></script>

    </body>
</html>
