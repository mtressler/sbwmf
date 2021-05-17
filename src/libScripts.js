/*
 *  LOADING DATA
 */

var translations = {
    "Track_num": "Track Number",
    "S_Key": "Key",
    "Album_uri": "URI",
    "name": "Name",
    "artist": "Artist",
    "popularity": "Popularity",
    "release_date": "Release Date",
    "genre": "Genre",
    "playlist_uri": "URI",
    "description": "Description",
    "track_count": "Track Count",
    "collaborative": "Collaborative",
    "owner_user_id": "Owner ID",
    "Duration": "Duration (s)",
    "image": "Image"
}

var song_query_results;

function libQuery(div, headers, table, filters=null, order=null, limit=null) {
    var query = "select ";
    var first = true;
    headers.forEach(h => {
        if (first)
            first = false;
        else
            query += ", ";
        if (h == "Duration")
            query += "round(";
        query += h;
        if (h == "Duration")
            query += " / 1000, 2)";
        if (h in translations) {
            query += " as \"";
            query += translations[h];
            query += "\"";
        }
    })
    query += " from ";
    query += table;

    if (filters ) {
        first = true;
        filters.forEach(f => {
            if (first) {
                first = false;
                query += " where ";
            }
            else
                query += " and ";
            query += f[0];
            query += " ";
            query += f[1];
            query += " ";
            query += f[2];
        })
    }

    if (order && order.length) {
        query += " order by";
        var first = true;
        order.forEach(o => {
            if (first)
                first = false;
            else
                query += ',';
            query += " ";
            query += o[0];
            query += " ";
            query += o[1];
        })
    }

    if (limit) {
        query += " limit ";
        query += limit;
    }

    query += ";";
    console.log("Query: " + query);

    var headers_translated = [];
    headers.forEach(h => {
        if (h in translations)
            headers_translated.push(translations[h]);
        else
            headers_translated.push(h);
    })


    data = {
        'query' : query,
        'headers' : headers_translated
    }


    $.ajax({
        type: 'POST',
        url: 'libQuery.php',
        data: data,
        success: function (result) {
            if (table == "Songs") {
                if (div == "SAVE SONGS") {
                    song_query_results = result.split('#%&#%&');
                    song_query_results.pop();
                    document.getElementById("save-playlist").style.display = "inline-block";
                    console.log(song_query_results);
                } else {
                    document.getElementById(div).innerHTML = result;
                    libQuery("SAVE SONGS", ["Song_uri"], table, filters, order, limit);
                }
            } else {
                document.getElementById("save-playlist").style.display = "none";
                document.getElementById(div).innerHTML = result;
            }
        },
        error: function (err) {console.log("ERROR");console.log(err); return "ERROR querying data";}
    });
}

/*
 * SLIDERS
 */
// name
var nameSlider = document.getElementById('name-input');
var nameSliderG = document.getElementById('name-regex-group');

// artist
var artistSlider = document.getElementById('artist-input');
var artistSliderG = document.getElementById('artist-regex-group');

// image
//var imageSlider = document.getElementById('image-slider');
//var imageSliderG = document.getElementById('image-slider-group');

// release-date
var releaseDateSlider = document.getElementById('release-date-slider');
var releaseDateSliderG = document.getElementById('release-date-slider-group');
function timestamp(str) {
    return new Date(str).getTime();
}
noUiSlider.create(releaseDateSlider, {
    start: [new Date('1900').getTime(), timestamp(new Date().getTime())],
    connect: true,
    range: {
        'min': timestamp('1900'),
        '30%': timestamp('1950'),
        'max': (new Date().getTime())
    },
    step: 7*24*60*60*1000
});

var releaseDateLow = document.getElementById('release-date-input-low');
var releaseDateHigh = document.getElementById('release-date-input-high');

releaseDateSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    var date = new Date(Math.floor(value));
    var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
    if (handle) {
        releaseDateHigh.value = dateString;
    } else {
        releaseDateLow.value = dateString;
    }
});

releaseDateLow.addEventListener('change', function() {
    releaseDateSlider.noUiSlider.set([timestamp(this.value), null]);
})

releaseDateHigh.addEventListener('change', function() {
    releaseDateSlider.noUiSlider.set([null, timestamp(this.value)]);
})

// genre
var genreSlider = document.getElementById('genre-input');
var genreSliderG = document.getElementById('genre-regex-group');

// description
var descriptionSlider = document.getElementById('description-input');
var descriptionSliderG = document.getElementById('description-regex-group');

// track-count
var trackCountSlider = document.getElementById('track-count-slider');
var trackCountSliderG = document.getElementById('track-count-slider-group');
noUiSlider.create(trackCountSlider, {
    start: [0, 1000000],
    connect: true,
    step: 1,
    range: {
        'min': [0],
        '50%': [100],
        '75%': [1000],
        'max': [1000000]
    }
})

var trackCountLow = document.getElementById('track-count-input-low');
var trackCountHigh = document.getElementById('track-count-input-high');

trackCountSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        trackCountHigh.value = value;
    } else {
        trackCountLow.value = value;
    }
});

trackCountLow.addEventListener('change', function() {
    trackCountSlider.noUiSlider.set([this.value, null]);
})

trackCountHigh.addEventListener('change', function() {
    trackCountSlider.noUiSlider.set([null, this.value]);
})

// collaborative
var collaborativeSlider = document.getElementById('collaborative-input');
var collaborativeSliderG = document.getElementById('collaborative-switch-group');

// owner-spotify-id
var ownerSpotifyIdSlider = document.getElementById('owner-user-id-input');
var ownerSpotifyIdSliderG = document.getElementById('owner-user-id-regex-group');

// duration
var durationSlider = document.getElementById('duration-slider');
var durationSliderG = document.getElementById('duration-slider-group');
noUiSlider.create(durationSlider, {
    start: [0, 3600000],
    connect: true,
    step: 1000,
    range: {
        'min': [0],
        '30%': [300000],
        '80%': [1200000],
        'max': [3600000]
    }
})

var durationLow = document.getElementById('duration-input-low');
var durationHigh = document.getElementById('duration-input-high');

durationSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        durationHigh.value = value / 1000;
    } else {
        durationLow.value = value / 1000;
    }
});

durationLow.addEventListener('change', function() {
    durationSlider.noUiSlider.set([this.value*1000, null]);
})

durationHigh.addEventListener('change', function() {
    durationSlider.noUiSlider.set([null, this.value*1000]);
})

// track-number
var trackNumberSlider = document.getElementById('track-num-slider');
var trackNumberSliderG = document.getElementById('track-num-slider-group');
noUiSlider.create(trackNumberSlider, {
    start: [1, 1000],
    connect: true,
    step: 1,
    range: {
        'min': 0,
        '50%': 100,
        '75%': 300,
        'max': 1000
    }
})

var trackNumberLow = document.getElementById('track-num-input-low');
var trackNumberHigh = document.getElementById('track-num-input-high');

trackNumberSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        trackNumberHigh.value = value;
    } else {
        trackNumberLow.value = value;
    }
});

trackNumberLow.addEventListener('change', function() {
    trackNumberSlider.noUiSlider.set([this.value, null]);
})

trackNumberHigh.addEventListener('change', function() {
    trackNumberSlider.noUiSlider.set([null, this.value]);
})

// key
var keySlider = document.getElementById('key-slider');
var keySliderG = document.getElementById('key-slider-group');
noUiSlider.create(keySlider, {
    start: [0, 11],
    connect: true,
    step: 1,
    range: {
        'min': 0,
        'max': 11
    }
})

var keyLow = document.getElementById('key-input-low');
var keyHigh = document.getElementById('key-input-high');

keySlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        keyHigh.value = value;
    } else {
        keyLow.value = value;
    }
});

keyLow.addEventListener('change', function() {
    keySlider.noUiSlider.set([this.value, null]);
})

keyHigh.addEventListener('change', function() {
    keySlider.noUiSlider.set([null, this.value]);
})

// valence
var valenceSlider = document.getElementById('valence-slider');
var valenceSliderG = document.getElementById('valence-slider-group');
noUiSlider.create(valenceSlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var valenceLow = document.getElementById('valence-input-low');
var valenceHigh = document.getElementById('valence-input-high');

valenceSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        valenceHigh.value = value;
    } else {
        valenceLow.value = value;
    }
});

valenceLow.addEventListener('change', function() {
    valenceSlider.noUiSlider.set([this.value, null]);
})

valenceHigh.addEventListener('change', function() {
    valenceSlider.noUiSlider.set([null, this.value]);
})

// energy
var energySlider = document.getElementById('energy-slider');
var energySliderG = document.getElementById('energy-slider-group');
noUiSlider.create(energySlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var energyLow = document.getElementById('energy-input-low');
var energyHigh = document.getElementById('energy-input-high');

energySlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        energyHigh.value = value;
    } else {
        energyLow.value = value;
    }
});

energyLow.addEventListener('change', function() {
    energySlider.noUiSlider.set([this.value, null]);
})

energyHigh.addEventListener('change', function() {
    energySlider.noUiSlider.set([null, this.value]);
})

// tempo
var tempoSlider = document.getElementById('tempo-slider');
var tempoSliderG = document.getElementById('tempo-slider-group');
noUiSlider.create(tempoSlider, {
    start: [0, 300],
    connect: true,
    range: {
        'min': 0,
        'max': 300
    }
})

var tempoLow = document.getElementById('tempo-input-low');
var tempoHigh = document.getElementById('tempo-input-high');

tempoSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        tempoHigh.value = value;
    } else {
        tempoLow.value = value;
    }
});

tempoLow.addEventListener('change', function() {
    tempoSlider.noUiSlider.set([this.value, null]);
})

tempoHigh.addEventListener('change', function() {
    tempoSlider.noUiSlider.set([null, this.value]);
})

// liveness
var livenessSlider = document.getElementById('liveness-slider');
var livenessSliderG = document.getElementById('liveness-slider-group');
noUiSlider.create(livenessSlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var livenessLow = document.getElementById('liveness-input-low');
var livenessHigh = document.getElementById('liveness-input-high');

livenessSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        livenessHigh.value = value;
    } else {
        livenessLow.value = value;
    }
});

livenessLow.addEventListener('change', function() {
    livenessSlider.noUiSlider.set([this.value, null]);
})

livenessHigh.addEventListener('change', function() {
    livenessSlider.noUiSlider.set([null, this.value]);
})

// danceability
var danceabilitySlider = document.getElementById('danceability-slider');
var danceabilitySliderG = document.getElementById('danceability-slider-group');
noUiSlider.create(danceabilitySlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var danceabilityLow = document.getElementById('danceability-input-low');
var danceabilityHigh = document.getElementById('danceability-input-high');

danceabilitySlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        danceabilityHigh.value = value;
    } else {
        danceabilityLow.value = value;
    }
});

danceabilityLow.addEventListener('change', function() {
    danceabilitySlider.noUiSlider.set([this.value, null]);
})

danceabilityHigh.addEventListener('change', function() {
    danceabilitySlider.noUiSlider.set([null, this.value]);
})

// loudness
var loudnessSlider = document.getElementById('loudness-slider');
var loudnessSliderG = document.getElementById('loudness-slider-group');
noUiSlider.create(loudnessSlider, {
    start: [-70, 5],
    connect: true,
    range: {
        'min': -70,
        'max': 5
    }
})

var loudnessLow = document.getElementById('loudness-input-low');
var loudnessHigh = document.getElementById('loudness-input-high');

loudnessSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        loudnessHigh.value = value;
    } else {
        loudnessLow.value = value;
    }
});

loudnessLow.addEventListener('change', function() {
    loudnessSlider.noUiSlider.set([this.value, null]);
})

loudnessHigh.addEventListener('change', function() {
    loudnessSlider.noUiSlider.set([null, this.value]);
})

// speechiness
var speechinessSlider = document.getElementById('speechiness-slider');
var speechinessSliderG = document.getElementById('speechiness-slider-group');
noUiSlider.create(speechinessSlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var speechinessLow = document.getElementById('speechiness-input-low');
var speechinessHigh = document.getElementById('speechiness-input-high');

speechinessSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        speechinessHigh.value = value;
    } else {
        speechinessLow.value = value;
    }
});

speechinessLow.addEventListener('change', function() {
    speechinessSlider.noUiSlider.set([this.value, null]);
})

speechinessHigh.addEventListener('change', function() {
    speechinessSlider.noUiSlider.set([null, this.value]);
})

// acousticness
var acousticnessSlider = document.getElementById('acousticness-slider');
var acousticnessSliderG = document.getElementById('acousticness-slider-group');
noUiSlider.create(acousticnessSlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var acousticnessLow = document.getElementById('acousticness-input-low');
var acousticnessHigh = document.getElementById('acousticness-input-high');

acousticnessSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        acousticnessHigh.value = value;
    } else {
        acousticnessLow.value = value;
    }
});

acousticnessLow.addEventListener('change', function() {
    acousticnessSlider.noUiSlider.set([this.value, null]);
})

acousticnessHigh.addEventListener('change', function() {
    acousticnessSlider.noUiSlider.set([null, this.value]);
})

// instrumentalness
var instrumentalnessSlider = document.getElementById('instrumentalness-slider');
var instrumentalnessSliderG = document.getElementById('instrumentalness-slider-group');
noUiSlider.create(instrumentalnessSlider, {
    start: [0, 1],
    connect: true,
    range: {
        'min': 0,
        'max': 1
    }
})

var instrumentalnessLow = document.getElementById('instrumentalness-input-low');
var instrumentalnessHigh = document.getElementById('instrumentalness-input-high');

instrumentalnessSlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        instrumentalnessHigh.value = value;
    } else {
        instrumentalnessLow.value = value;
    }
});

instrumentalnessLow.addEventListener('change', function() {
    instrumentalnessSlider.noUiSlider.set([this.value, null]);
})

instrumentalnessHigh.addEventListener('change', function() {
    instrumentalnessSlider.noUiSlider.set([null, this.value]);
})


// popularity
var popularitySlider = document.getElementById('popularity-slider');
var popularitySliderG = document.getElementById('popularity-slider-group');
noUiSlider.create(popularitySlider, {
    start: [0, 100],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
})

var popularityLow = document.getElementById('popularity-input-low');
var popularityHigh = document.getElementById('popularity-input-high');

popularitySlider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle) {
        popularityHigh.value = value;
    } else {
        popularityLow.value = value;
    }
});

popularityLow.addEventListener('change', function() {
    popularitySlider.noUiSlider.set([this.value, null]);
})

popularityHigh.addEventListener('change', function() {
    popularitySlider.noUiSlider.set([null, this.value]);
})

// limit
var limitSlider = document.getElementById('limit-slider');
var limitSliderG = document.getElementById('limit-slider-group');
noUiSlider.create(limitSlider, {
    start: 1000,
    step: 1,
    connect: [true, false],
    range: {
        'min': 0,
        '50%': 1000,
        '75%': 50000,
        'max': 1000000
    }
});

var limitHigh = document.getElementById('limit-input');

limitSlider.noUiSlider.on('update', function (value) {
    limitHigh.value = value;
});

limitHigh.addEventListener('change', function() {
    limitSlider.noUiSlider.set(this.value);
});

/*
allFiltersV = [];
allFiltersV.push(nameSlider);
allFiltersV.push(popularitySlider);
allFiltersV.push(artistSlider);
allFiltersV.push(releaseDateSlider);
allFiltersV.push(imageSlider);
allFiltersV.push(genreSlider);
allFiltersV.push(descriptionSlider);
allFiltersV.push(trackCountSlider);
allFiltersV.push(trackNumberSlider);
allFiltersV.push(durationSlider);
allFiltersV.push(keySlider);
allFiltersV.push(energySlider);
allFiltersV.push(livenessSlider);
allFiltersV.push(loudnessSlider);
allFiltersV.push(valenceSlider);
allFiltersV.push(tempoSlider);
allFiltersV.push(danceabilitySlider);
allFiltersV.push(speechinessSlider);
allFiltersV.push(instrumentalnessSlider);
allFiltersV.push(acousticnessSlider);

songFiltersV = [];
songFiltersV.push([nameSlider, 'Name']);
songFiltersV.push([artistSlider, 'Artist']);
songFiltersV.push([durationSlider, 'Duration']);
songFiltersV.push([popularitySlider, 'Popularity']);
songFiltersV.push([trackNumberSlider, 'Track_num']);
songFiltersV.push([keySlider, 'S_Key']);
songFiltersV.push([valenceSlider, 'Valence']);
songFiltersV.push([energySlider, 'Energy']);
songFiltersV.push([tempoSlider, 'Tempo']);
songFiltersV.push([livenessSlider, 'Liveness']);
songFiltersV.push([danceabilitySlider, 'Danceability']);
songFiltersV.push([loudnessSlider, 'Loudness']);
songFiltersV.push([speechinessSlider, 'Speechiness']);
songFiltersV.push([acousticnessSlider, 'Acousticness']);
songFiltersV.push([instrumentalnessSlider, 'Instrumentalness']);

albumFiltersV = [];
albumFiltersV.push([nameSlider, 'name']);
albumFiltersV.push([artistSlider, 'artist']);
albumFiltersV.push([popularitySlider, 'popularity']);
albumFiltersV.push([releaseDateSlider, 'release_date']);
albumFiltersV.push([genreSlider, 'genre']);
albumFiltersV.push([imageSlider, 'image']);

playlistFiltersV = [];
playlistFiltersV.push([nameSlider, 'name']);
playlistFiltersV.push([descriptionSlider, 'description']);
playlistFiltersV.push([trackCountSlider, 'track_count']);
playlistFiltersV.push([collaborativeSlider, 'collaborative']);
playlistFiltersV.push([ownerSpotifyIdSlider, 'owner_user_id']);
playlistFiltersV.push([imageSlider, 'image']);
*/
allFilters = [];
allFilters.push(nameSliderG);
allFilters.push(popularitySliderG);
allFilters.push(artistSliderG);
allFilters.push(releaseDateSliderG);
allFilters.push(genreSliderG);
allFilters.push(descriptionSliderG);
allFilters.push(trackCountSliderG);
allFilters.push(collaborativeSliderG);
allFilters.push(ownerSpotifyIdSliderG);
allFilters.push(trackNumberSliderG);
allFilters.push(durationSliderG);
allFilters.push(keySliderG);
allFilters.push(energySliderG);
allFilters.push(livenessSliderG);
allFilters.push(loudnessSliderG);
allFilters.push(valenceSliderG);
allFilters.push(tempoSliderG);
allFilters.push(danceabilitySliderG);
allFilters.push(speechinessSliderG);
allFilters.push(instrumentalnessSliderG);
allFilters.push(acousticnessSliderG);

songFilters = [];
songFilters.push(nameSliderG);
songFilters.push(artistSliderG);
songFilters.push(durationSliderG);
songFilters.push(popularitySliderG);
songFilters.push(trackNumberSliderG);
songFilters.push(keySliderG);
songFilters.push(valenceSliderG);
songFilters.push(energySliderG);
songFilters.push(tempoSliderG);
songFilters.push(livenessSliderG);
songFilters.push(danceabilitySliderG);
songFilters.push(loudnessSliderG);
songFilters.push(speechinessSliderG);
songFilters.push(acousticnessSliderG);
songFilters.push(instrumentalnessSliderG);

albumFilters = [];
albumFilters.push(nameSliderG);
albumFilters.push(artistSliderG);
albumFilters.push(popularitySliderG);
albumFilters.push(releaseDateSliderG);
albumFilters.push(genreSliderG);

playlistFilters = [];
playlistFilters.push(nameSliderG);
playlistFilters.push(descriptionSliderG);
playlistFilters.push(trackCountSliderG);
playlistFilters.push(collaborativeSliderG);
playlistFilters.push(ownerSpotifyIdSliderG);

var nameCheck = document.getElementById('name-check');
var popularityCheck= document.getElementById('popularity-check');
var artistCheck= document.getElementById('artist-check');
var releaseDateCheck= document.getElementById('release-date-check');
var imageCheck= document.getElementById('image-check');
var genreCheck= document.getElementById('genre-check');
var descriptionCheck= document.getElementById('description-check');
var trackCountCheck= document.getElementById('track-count-check');
var collaborativeCheck= document.getElementById('collaborative-check');
var ownerSpotifyIdCheck= document.getElementById('owner-spotify-id-check');
var trackNumberCheck= document.getElementById('track-num-check');
var durationCheck= document.getElementById('duration-check');
var keyCheck= document.getElementById('key-check');
var energyCheck= document.getElementById('energy-check');
var livenessCheck= document.getElementById('liveness-check');
var loudnessCheck= document.getElementById('loudness-check');
var valenceCheck= document.getElementById('valence-check');
var tempoCheck= document.getElementById('tempo-check');
var danceabilityCheck= document.getElementById('danceability-check');
var speechinessCheck= document.getElementById('speechiness-check');
var instrumentalnessCheck= document.getElementById('instrumentalness-check');
var acousticnessCheck= document.getElementById('acousticness-check');
allChecks = [];
allChecks.push(nameCheck);
allChecks.push(popularityCheck);
allChecks.push(artistCheck);
allChecks.push(releaseDateCheck);
allChecks.push(imageCheck);
allChecks.push(genreCheck);
allChecks.push(descriptionCheck);
allChecks.push(trackCountCheck);
allChecks.push(collaborativeCheck);
allChecks.push(ownerSpotifyIdCheck);
allChecks.push(trackNumberCheck);
allChecks.push(durationCheck);
allChecks.push(keyCheck);
allChecks.push(energyCheck);
allChecks.push(livenessCheck);
allChecks.push(loudnessCheck);
allChecks.push(valenceCheck);
allChecks.push(tempoCheck);
allChecks.push(danceabilityCheck);
allChecks.push(speechinessCheck);
allChecks.push(instrumentalnessCheck);
allChecks.push(acousticnessCheck);

songChecks = [];
songChecks.push(nameCheck);
songChecks.push(artistCheck);
songChecks.push(durationCheck);
songChecks.push(popularityCheck);
songChecks.push(trackNumberCheck);
songChecks.push(keyCheck);
songChecks.push(valenceCheck);
songChecks.push(energyCheck);
songChecks.push(tempoCheck);
songChecks.push(livenessCheck);
songChecks.push(danceabilityCheck);
songChecks.push(loudnessCheck);
songChecks.push(speechinessCheck);
songChecks.push(acousticnessCheck);
songChecks.push(instrumentalnessCheck);

albumChecks = [];
albumChecks.push(nameCheck);
albumChecks.push(artistCheck);
albumChecks.push(popularityCheck);
albumChecks.push(releaseDateCheck);
albumChecks.push(genreCheck);
albumChecks.push(imageCheck);

playlistChecks = [];
playlistChecks.push(nameCheck);
playlistChecks.push(descriptionCheck);
playlistChecks.push(trackCountCheck);
playlistChecks.push(collaborativeCheck);
playlistChecks.push(ownerSpotifyIdCheck);
playlistChecks.push(imageCheck);

var nameCheckbox = document.getElementById('checkbox-name');
var popularityCheckbox= document.getElementById('checkbox-popularity');
var artistCheckbox= document.getElementById('checkbox-artist');
var releaseDateCheckbox= document.getElementById('checkbox-release-date');
var imageCheckbox= document.getElementById('checkbox-image');
var genreCheckbox= document.getElementById('checkbox-genre');
var descriptionCheckbox= document.getElementById('checkbox-description');
var trackCountCheckbox= document.getElementById('checkbox-track-count');
var collaborativeCheckbox= document.getElementById('checkbox-collaborative');
var ownerSpotifyIdCheckbox= document.getElementById('checkbox-owner-user-id');
var trackNumberCheckbox= document.getElementById('checkbox-track-num');
var durationCheckbox= document.getElementById('checkbox-duration');
var keyCheckbox= document.getElementById('checkbox-key');
var energyCheckbox= document.getElementById('checkbox-energy');
var livenessCheckbox= document.getElementById('checkbox-liveness');
var loudnessCheckbox= document.getElementById('checkbox-loudness');
var valenceCheckbox= document.getElementById('checkbox-valence');
var tempoCheckbox= document.getElementById('checkbox-tempo');
var danceabilityCheckbox= document.getElementById('checkbox-danceability');
var speechinessCheckbox= document.getElementById('checkbox-speechiness');
var instrumentalnessCheckbox= document.getElementById('checkbox-instrumentalness');
var acousticnessCheckbox= document.getElementById('checkbox-acousticness');
allCheckbox = [];
allCheckbox.push(nameCheckbox);
allCheckbox.push(popularityCheckbox);
allCheckbox.push(artistCheckbox);
allCheckbox.push(releaseDateCheckbox);
allCheckbox.push(imageCheckbox);
allCheckbox.push(genreCheckbox);
allCheckbox.push(descriptionCheckbox);
allCheckbox.push(trackCountCheckbox);
allCheckbox.push(collaborativeCheckbox);
allCheckbox.push(ownerSpotifyIdCheckbox);
allCheckbox.push(trackNumberCheckbox);
allCheckbox.push(durationCheckbox);
allCheckbox.push(keyCheckbox);
allCheckbox.push(energyCheckbox);
allCheckbox.push(livenessCheckbox);
allCheckbox.push(loudnessCheckbox);
allCheckbox.push(valenceCheckbox);
allCheckbox.push(tempoCheckbox);
allCheckbox.push(danceabilityCheckbox);
allCheckbox.push(speechinessCheckbox);
allCheckbox.push(instrumentalnessCheckbox);
allCheckbox.push(acousticnessCheckbox);

songCheckbox = [];
songCheckbox.push(nameCheckbox);
songCheckbox.push(artistCheckbox);
songCheckbox.push(durationCheckbox);
songCheckbox.push(popularityCheckbox);
songCheckbox.push(trackNumberCheckbox);
songCheckbox.push(keyCheckbox);
songCheckbox.push(valenceCheckbox);
songCheckbox.push(energyCheckbox);
songCheckbox.push(tempoCheckbox);
songCheckbox.push(livenessCheckbox);
songCheckbox.push(danceabilityCheckbox);
songCheckbox.push(loudnessCheckbox);
songCheckbox.push(speechinessCheckbox);
songCheckbox.push(acousticnessCheckbox);
songCheckbox.push(instrumentalnessCheckbox);

albumCheckbox = [];
albumCheckbox.push(nameCheckbox);
albumCheckbox.push(artistCheckbox);
albumCheckbox.push(popularityCheckbox);
albumCheckbox.push(releaseDateCheckbox);
albumCheckbox.push(genreCheckbox);
albumCheckbox.push(imageCheckbox);

playlistCheckbox = [];
playlistCheckbox.push(nameCheckbox);
playlistCheckbox.push(descriptionCheckbox);
playlistCheckbox.push(trackCountCheckbox);
playlistCheckbox.push(collaborativeCheckbox);
playlistCheckbox.push(ownerSpotifyIdCheckbox);
playlistCheckbox.push(imageCheckbox);

var sortSongs = document.getElementById('sort-songs');
var sortAlbums = document.getElementById('sort-albums');
var sortPlaylists = document.getElementById('sort-playlists');

$('#songRadio').on('click', function() {
    document.querySelectorAll('.library-header').forEach(h => {
        h.style.display = 'block';
    })
    allFilters.forEach(f => {
        f.style.display = 'none';
    })
    songFilters.forEach(f => {
        f.style.display = 'flex';
    })
    allCheckbox.forEach(f => {
        f.checked = false;
    })
    songCheckbox.forEach(f => {
        ;//f.checked = true;
    })
    nameCheckbox.checked = true;
    allChecks.forEach(f => {
        f.style.display = 'none';
    })
    songChecks.forEach(f => {
        f.style.display = 'flex';
    })
    sortSongs.style.display = 'flex';
    sortAlbums.style.display = 'none';
    sortPlaylists.style.display = 'none';
    limitSliderG.style.display = 'flex';
    document.getElementById("search-button").style.display = "inline-block";
})

$('#albumRadio').on('click', function() {
    document.querySelectorAll('.library-header').forEach(h => {
        h.style.display = 'block';
    })
    allFilters.forEach(f => {
        f.style.display = 'none';
    })
    albumFilters.forEach(f => {
        f.style.display = 'flex';
    })
    allCheckbox.forEach(f => {
        f.checked = false;
    })
    albumCheckbox.forEach(f => {
        ;//f.checked = true;
    })
    nameCheckbox.checked = true;
    allChecks.forEach(f => {
        f.style.display = 'none';
    })
    albumChecks.forEach(f => {
        f.style.display = 'flex';
    })
    sortSongs.style.display = 'none';
    sortAlbums.style.display = 'flex';
    sortPlaylists.style.display = 'none';
    limitSliderG.style.display = 'flex';
    document.getElementById("save-playlist").style.display = "none";
    document.getElementById("search-button").style.display = "inline-block";
})

$('#playlistRadio').on('click', function() {
    document.querySelectorAll('.library-header').forEach(h => {
        h.style.display = 'block';
    })
    allFilters.forEach(f => {
        f.style.display = 'none';
    })
    playlistFilters.forEach(f => {
        f.style.display = 'flex';
    })
    allCheckbox.forEach(f => {
        f.checked = false;
    })
    playlistCheckbox.forEach(f => {
        ;//f.checked = true;
    })
    nameCheckbox.checked = true;
    allChecks.forEach(f => {
        f.style.display = 'none';
    })
    playlistChecks.forEach(f => {
        f.style.display = 'flex';
    })
    sortSongs.style.display = 'none';
    sortAlbums.style.display = 'none';
    sortPlaylists.style.display = 'flex';
    limitSliderG.style.display = 'flex';
    document.getElementById("save-playlist").style.display = "none";
    document.getElementById("search-button").style.display = "inline-block";
})

$('#search-button').on('click', function() {
    var includedHeaders = [];
    if (document.getElementById('checkbox-name').checked)
        includedHeaders.push('Name');
    if (document.getElementById('checkbox-popularity').checked)
        includedHeaders.push('Popularity');
    if (document.getElementById('checkbox-artist').checked)
        includedHeaders.push('Artist');
    if (document.getElementById('checkbox-release-date').checked)
        includedHeaders.push('release_date');
    if (document.getElementById('checkbox-image').checked)
        includedHeaders.push('image');
    if (document.getElementById('checkbox-genre').checked)
        includedHeaders.push('genre');
    if (document.getElementById('checkbox-description').checked)
        includedHeaders.push('description');
    if (document.getElementById('checkbox-track-count').checked)
        includedHeaders.push('track_count');
    if (document.getElementById('checkbox-collaborative').checked)
        includedHeaders.push('collaborative');
    if (document.getElementById('checkbox-owner-user-id').checked)
        includedHeaders.push('owner_user_id');
    if (document.getElementById('checkbox-track-num').checked)
        includedHeaders.push('Track_num');
    if (document.getElementById('checkbox-duration').checked)
        includedHeaders.push('Duration');
    if (document.getElementById('checkbox-key').checked)
        includedHeaders.push('S_Key');
    if (document.getElementById('checkbox-energy').checked)
        includedHeaders.push('Energy');
    if (document.getElementById('checkbox-liveness').checked)
        includedHeaders.push('Liveness');
    if (document.getElementById('checkbox-loudness').checked)
        includedHeaders.push('Loudness');
    if (document.getElementById('checkbox-valence').checked)
        includedHeaders.push('Valence');
    if (document.getElementById('checkbox-tempo').checked)
        includedHeaders.push('Tempo');
    if (document.getElementById('checkbox-danceability').checked)
        includedHeaders.push('Danceability');
    if (document.getElementById('checkbox-speechiness').checked)
        includedHeaders.push('Speechiness');
    if (document.getElementById('checkbox-instrumentalness').checked)
        includedHeaders.push('Instrumentalness');
    if (document.getElementById('checkbox-acousticness').checked)
        includedHeaders.push('Acousticness');
    if (document.getElementById('songRadio').checked) {
        var filters = [];
        //nameSlider
        if (nameSlider.value != "")
            filters.push(['Name', 'like', '\'%' + nameSlider.value + '%\'']);
        //artistSlider
        if (artistSlider.value != "")
            filters.push(['Artist', 'like', '\'%' + artistSlider.value + '%\'']);
        //durationSlider
        let dur = durationSlider.noUiSlider.get();
        if (dur[0] > 0)
            filters.push(['Duration', '>', dur[0]]);
        if (dur[1] < 3600000)
            filters.push(['Duration', '<', dur[1]]);
        //popularitySlider
        let pop = popularitySlider.noUiSlider.get();
        if (pop[0] > 0)
            filters.push(['Popularity', '>', pop[0]]);
        if (pop[1] < 100)
            filters.push(['Popularity', '<', pop[1]]);
        //trackNumberSlider
        let track = trackNumberSlider.noUiSlider.get();
        if (track[0] > 1)
            filters.push(['Track_num', '>', track[0]]);
        if (track[1] < 1000)
            filters.push(['Track_num', '<', track[1]]);
        //keySlider
        let key = keySlider.noUiSlider.get();
        if (key[0] > 0)
            filters.push(['S_Key', '>', key[0]]);
        if (key[1] < 11)
            filters.push(['S_Key', '<', key[1]]);
        //valenceSlider
        let val = valenceSlider.noUiSlider.get();
        if (val[0] > 0)
            filters.push(['Valence', '>', val[0]]);
        if (val[1] < 1)
            filters.push(['Valence', '<', val[1]]);
        //energySlider
        let energy = energySlider.noUiSlider.get();
        if (energy[0] > 0)
            filters.push(['Energy', '>', energy[0]]);
        if (energy[1] < 1)
            filters.push(['Energy', '<', energy[1]]);
        //tempoSlider
        let tempo = tempoSlider.noUiSlider.get();
        if (tempo[0] > 0)
            filters.push(['Tempo', '>', tempo[0]]);
        if (tempo[1] < 300)
            filters.push(['Tempo', '<', tempo[1]]);
        //livenessSlider
        let live = livenessSlider.noUiSlider.get();
        if (live[0] > 0)
            filters.push(['Liveness', '>', live[0]]);
        if (live[1] < 1)
            filters.push(['Liveness', '<', live[1]]);
        //danceabilitySlider
        let dance = danceabilitySlider.noUiSlider.get();
        if (dance[0] > 0)
            filters.push(['Danceability', '>', dance[0]]);
        if (dance[1] < 1)
            filters.push(['Danceability', '<', dance[1]]);
        //loudnessSlider
        let loud = loudnessSlider.noUiSlider.get();
        if (loud[0] > -70)
            filters.push(['Loudness', '>', loud[0]]);
        if (loud[1] < 5)
            filters.push(['Loudness', '<', loud[1]]);
        //speechinessSlider
        let speech = speechinessSlider.noUiSlider.get();
        if (speech[0] > 0)
            filters.push(['Speechiness', '>', speech[0]]);
        if (speech[1] < 1)
            filters.push(['Speechiness', '<', speech[1]]);
        //acousticnessSlider
        let acoustic = acousticnessSlider.noUiSlider.get();
        if (acoustic[0] > 0)
            filters.push(['Acousticness', '>', acoustic[0]]);
        if (acoustic[1] < 1)
            filters.push(['Acousticness', '<', acoustic[1]]);
        //instrumentalnessSlider
        let instr = instrumentalnessSlider.noUiSlider.get();
        if (instr[0] > 0)
            filters.push(['Instrumentalness', '>', instr[0]]);
        if (instr[1] < 1)
            filters.push(['Instrumentalness', '<', instr[1]]);

        let order = [];
        let o1 = $('#ssf').val();
        let o2 = $('#ssfo').val();
        let o3 = $('#sss').val();
        let o4 = $('#ssso').val();
        let o5 = $('#sst').val();
        let o6 = $('#ssto').val();
        if (o1 != '-')
            order.push([o1, o2]);
        if (o3 != '-')
            order.push([o3, o4]);
        if (o5 != '-')
            order.push([o5, o6]);

        libQuery("table-output", includedHeaders, 'Songs', filters, order, Math.round(limitSlider.noUiSlider.get()));
    } else if (document.getElementById('albumRadio').checked) {
        var filters = [];
        //nameSlider
        if (nameSlider.value != "")
            filters.push(['Name', 'like', '\'%' + nameSlider.value + '%\'']);
        //artistSlider
        if (artistSlider.value != "")
            filters.push(['Artist', 'like', '\'%' + artistSlider.value + '%\'']);
        //popularitySlider
        let pop = popularitySlider.noUiSlider.get();
        if (pop[0] > 0)
            filters.push(['Popularity', '>', pop[0]]);
        if (pop[1] < 100)
            filters.push(['Popularity', '<', pop[1]]);
        //genreSlider
        if (genreSlider.value != "")
            filters.push(['Genre', 'like', '\'%' + genreSlider.value + '%\'']);
        //releaseDateSlider
        var date1 = new Date(Math.floor(releaseDateSlider.noUiSlider.get()[0]));
        var date1String = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + ("0" + date1.getDate()).slice(-2);
        if (date1String != '1899-12-31')
            filters.push(['release_date', '>', '\'' + date1String + '\'']);
        var date2 = new Date(Math.floor(releaseDateSlider.noUiSlider.get()[1]));
        var date2String = date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + ("0" + date2.getDate()).slice(-2);
        var date3 = new Date();
        var date3String = date3.getFullYear() + '-' + ("0" + (date3.getMonth() + 1)).slice(-2) + '-' + ("0" + date3.getDate()).slice(-2);
        if (date2String != date3String)
            filters.push(['release_date', '<', '\'' + date2String + '\'']);

        var order = [];
        let o1 = $('#saf').val();
        let o2 = $('#safo').val();
        let o3 = $('#sas').val();
        let o4 = $('#saso').val();
        let o5 = $('#sat').val();
        let o6 = $('#sato').val();
        if (o1 != '-')
            order.push([o1, o2]);
        if (o3 != '-')
            order.push([o3, o4]);
        if (o5 != '-')
            order.push([o5, o6]);

        libQuery("table-output", includedHeaders, 'Albums', filters, order, Math.round(limitSlider.noUiSlider.get())); 
    } else if (document.getElementById('playlistRadio').checked) {
        var filters = [];
        //nameSlider
        if (nameSlider.value != "")
            filters.push(['Name', 'like', '\'%' + nameSlider.value + '%\'']);
        //descriptionSlider
        if (descriptionSlider.value != "")
            filters.push(['description', 'like', '\'%' + descriptionSlider.value + '%\'']);
        //trackCountSlider
        let track = trackCountSlider.noUiSlider.get();
        if (track[0] > 0)
            filters.push(['track_count', '>', track[0]]);
        if (track[1] < 100)
            filters.push(['track_count', '<', track[1]]);
        //collaborativeSlider
        console.log(collaborativeSlider.value);
        if (collaborativeSlider.value != 'either')
            filters.push(['collaborative', '=', collaborativeSlider.value])
        //ownerSpotifyIdSlider
        if (ownerSpotifyIdSlider.value != "")
            filters.push(['owner_user_id', 'like', '\'%' + ownerSpotifyIdSlider.value + '%\'']);


        libQuery("table-output", includedHeaders, 'Playlists', filters, order, Math.round(limitSlider.noUiSlider.get())); 
    }
})

function chunkArray(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += 100)
        newArr.push(arr.slice(i, i+100));
    return newArr;
}

$('#save-playlist').on('click', function() {
    api_call('https://api.spotify.com/v1/me', 'GET').then( (res) => {
        var uid = res['id'];
        var playlist_name = "SBWMF #" + (Math.round(Math.random() * 10000000)).toString();
        var endpoint = 'https://api.spotify.com/v1/users/' + uid + '/playlists';
        var obj = new Object();
        obj['name'] = playlist_name;
        console.log(obj);
        console.log(JSON.stringify(obj));
        
        api_call_json(endpoint, 'POST', JSON.stringify(obj)).then( (res2) => {
            //console.log(res2);
            var pid = res2['id'];
            var endpoint2 = 'https://api.spotify.com/v1/playlists/' + pid + '/tracks';
            var count = 0;
            var chunked = chunkArray(song_query_results);
            for (var i = 0; i < 111 && i < chunked.length; i++) {
                var body = new Object();
                body['uris'] = chunked[i];
                console.log(body);
                console.log(JSON.stringify(body));
                setTimeout(() => {
                    api_call_json(endpoint2, 'POST', JSON.stringify(body))
                        .then((res3) => {
                            ;//console.log(res3);
                        }).catch((err3) => {
                            console.log(err3);
                        });
                }, 200 * count);
                count++;
            }
        }).catch((err2) => {
            console.log(err2);
        });

    }).catch((err) => {
        console.log(err);
    });
});

function api_call(url, method, body) {
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
        url: url,
        type: method,
        data: body,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        },
        success: function(response) {
            return response;
        }
    })
}

function api_call_json(url, method, body) {
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
        url: url,
        type: method,
        data: body,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage['token']).tok
        },
        success: function(response) {
            return response;
        }
    })
}
