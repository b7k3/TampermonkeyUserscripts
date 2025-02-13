// ==UserScript==
// @name         Bypass Multiple Sites
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Bypass multiple ad-link sites automatically
// @author       b7k3
// @match        *://linkvertise.com/*
// @match        *://lootdest.org/*
// @match        *://work.ink/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const bypassSites = ["linkvertise.com", "lootdest.org", "work.ink"];
    const currentUrl = window.location.href;

    if (bypassSites.some(site => currentUrl.includes(site))) {
        const apiUrl = `https://iwoozie.baby/api/free/bypass?url=${encodeURIComponent(currentUrl)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result) {

                    if (data.result.startsWith("http")) {
                        window.location.href = data.result;
                        return
                    } else {
                        alert(data.result)
                    }

                } else {
                    console.error("Bypass failed: No result in response", data);
                }
            })
            .catch(error => console.error("Error fetching bypass link:", error));
    }
})();
