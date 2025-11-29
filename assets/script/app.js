'use strict';
function setCookie(name, value, maxAgeSeconds) {

    const options = {
        path: '/',
        SameSite: 'Lax'
    };
    if (maxAgeSeconds) {
        options['max-age'] = maxAgeSeconds;
    }

    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let option in options) {
        cookieString += ';' + option + '=' + options[option];
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
function getBrowserName() {
    return navigator.userAgent;
}

function getOSName() {
    return navigator.platform;
}

function getScreenWidth() {
    return screen.width;
}

function getScreenHeight() {
    return screen.height;
}
const LIVE = 16;

const cookieDialog = document.getElementById('cookie-dialog');
const settingsDialog = document.getElementById('settings-dialog');

const acceptallBtn = document.querySelector('.accept-all');
const btnSettings = document.querySelector('.open-settings');
const saveBtn = document.querySelector('.save-preferences');

const browserCheck = document.getElementById('browser-toggle');
const osCheck = document.getElementById('os-toggle');
const widthCheck = document.getElementById('width-toggle');
const heightCheck = document.getElementById('height-toggle');


window.addEventListener('load', function () {

    const decision = getCookie('cookieDecision');
    if (decision === null) {
        setTimeout(() => {
            cookieDialog.showModal();
        }, 600);
    }
});
acceptallBtn.addEventListener('click', function () {

    setCookie('browser', getBrowserName(), LIVE);
    setCookie('os', getOSName(), LIVE);
    setCookie('screenWidth', getScreenWidth(), LIVE);
    setCookie('screenHeight', getScreenHeight(), LIVE);

    setCookie('cookieDecision', 'all', LIVE);

    cookieDialog.close();
});

btnSettings.addEventListener('click', function () {
    cookieDialog.close();
    settingsDialog.showModal();
});
saveBtn.addEventListener('click', function () {

    let anySelected = false;


function deleteCookie(name) {
       document.cookie = encodeURIComponent(name) +
            "=;max-age=0;path=/";
    }

     deleteCookie('browser');
    deleteCookie('os');
    deleteCookie('screenWidth');
    deleteCookie('screenHeight');
    
     if (browserCheck.checked) {
        setCookie('browser', getBrowserName(), LIVE);
        anySelected = true;
    }

    if (osCheck.checked) {
        setCookie('os', getOSName(), LIVE);
        anySelected = true;
    }

    if (widthCheck.checked) {
        setCookie('screenWidth', getScreenWidth(), LIVE);
        anySelected = true;
    }

    if (heightCheck.checked) {
        setCookie('screenHeight', getScreenHeight(), LIVE);
        anySelected = true;
    }

     if (anySelected) {
        setCookie('cookieDecision', 'custom', LIVE);
    } else {
        setCookie('cookieDecision', 'rejected', LIVE);
    }

    settingsDialog.close();
});