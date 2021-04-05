$(document).ready(function() {
    if (!localStorage['token'])
        updateToken();
})

function updateToken() {
    let url = new URL(window.location.href);
    url = url.toString();
    let s = url.search("access_token=");
    if (s == -1)
        return;
    let e = url.search('&');
    var token = url.substring(s+13, e)
    console.log(token);
    localStorage['token'] = token;
}

function testUserInfo() {
    api_call('https://api.spotify.com/v1/me').then( (res) => {
        document.getElementById("output").innerHTML = JSON.stringify(res);
    }).catch((err) => {
        document.getElementById("output").innerHTML = err;
    });

}

function api_call(url) {
    if (!localStorage['token']) {
        return Promise.reject("Error. Not logged in.");
    }
    return $.ajax({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + localStorage['token']
        },
        success: function(response) {
            return response;
        }
    })
}