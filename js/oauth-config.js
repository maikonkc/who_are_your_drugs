/*exported OAuthConfig*/
var OAuthConfig = (function() {
    'use strict';
    /* replace these values with yours obtained in the
    "My Applications" section of the Spotify developer site */
    var clientId = 'c48e0be2ada84eb994ab6bae7233731b';
    var redirectUri = 'http://localhost:5173/callback.html';
    if (location.href.indexOf('https://maikonkc.github.io') === 0) {
        redirectUri = 'https://maikonkc.github.io/who_is_your_drugs/callback.html';
    }

    var host = /http[s]?:\/\/[^/]+/.exec(redirectUri)[0]; 
    return {
        clientId: clientId,
        redirectUri: redirectUri,
        host: host,
        stateKey: 'spotify_auth_state'
    };
})();