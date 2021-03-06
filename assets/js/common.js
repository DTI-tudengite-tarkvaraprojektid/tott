function onSuccess(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`idtoken=${idToken}`);
}

function init() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

function onFailure(error) {
    console.error(error);
}

let logout = document.getElementsByClassName('logout')[0];

if (logout) {
    logout.addEventListener('click', signOut);
}

function signOut() {
    gapi.load('auth2', function () {
        gapi.auth2.init();

        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log('User signed out.');
        })
            .catch(e => console.error(e));
    });
}