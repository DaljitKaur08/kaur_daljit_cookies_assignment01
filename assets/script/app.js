'use strict';
function setCookie(name, value, maxAge) {

    const options = {
        path: '/',
        SameSite: 'Lax'
    };
    if (maxAge) {
        options['max-age'] = maxAge;
    }
    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let option in options) {
        cookieString += `; ${option}=${options[option]}`;
    }

    document.cookie = cookieString;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] =
            cookie.split('=').map(c => c.trim());
             if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}

