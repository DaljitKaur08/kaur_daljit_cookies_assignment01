'use strict';


function makeExpires(seconds) {
    let date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date.toUTCString();
}
const EXPIRES = makeExpires(16);


function setCookie(name, value, expiresString) {

    const options = {
        path: '/',
        SameSite: 'Lax',
        expires: expiresString
    };

    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let option in options) {
        cookieString += '; ' + option + '=' + options[option];
    }

    document.cookie = cookieString;
}

function getCookie(name) {
    const list = document.cookie.split(';');

    for (let cookie of list) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
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





const cookieDialog = document.getElementById('cookie-dialog');
const settingsDialog = document.getElementById('settings-dialog');

const acceptBtn = document.querySelector('.accept-all');
const settingsBtn = document.querySelector('.open-settings');
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


acceptBtn.addEventListener('click', function () {

    setCookie('browser', getBrowserName(), EXPIRES);
    setCookie('os', getOSName(), EXPIRES);
    setCookie('screenWidth', getScreenWidth(), EXPIRES);
    setCookie('screenHeight', getScreenHeight(), EXPIRES);

    setCookie('cookieDecision', 'all', EXPIRES);

    cookieDialog.close();
});


settingsBtn.addEventListener('click', function () {
    cookieDialog.close();
    settingsDialog.showModal();
});


saveBtn.addEventListener('click', function () {

    let anySelected = false;

    
    function deleteCookie(name) {
        document.cookie = encodeURIComponent(name) + "=; max-age=0; path=/";
    }

    deleteCookie('browser');
    deleteCookie('os');
    deleteCookie('screenWidth');
    deleteCookie('screenHeight');

    
    if (browserCheck.checked) {
        setCookie('browser', getBrowserName(), EXPIRES);
        anySelected = true;
    }

    if (osCheck.checked) {
        setCookie('os', getOSName(), EXPIRES);
        anySelected = true;
    }

    if (widthCheck.checked) {
        setCookie('screenWidth', getScreenWidth(), EXPIRES);
        anySelected = true;
    }

    if (heightCheck.checked) {
        setCookie('screenHeight', getScreenHeight(), EXPIRES);
        anySelected = true;
    }

   
    if (anySelected) {
        setCookie('cookieDecision', 'custom', EXPIRES);
    } else {
        setCookie('cookieDecision', 'rejected', EXPIRES);
    }

    settingsDialog.close();
});
