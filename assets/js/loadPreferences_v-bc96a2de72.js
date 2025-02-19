/* 
fetch("./assets/js/preferences.JSON").then(res => res.json()).then(data => setPreferences(data)); 
*/

function setPreferences(pref) {
    /* HEADER & NAVBAR */
    document.getElementById("serverLink").setAttribute("href", pref.links.server);
    document.getElementById("serverText").setAttribute("data-ip", pref.links.server);
    document.getElementById("serverText").innerHTML = pref.links.server;
    document.getElementById("discordLink").setAttribute("href", pref.links.discord);

    /* HOMEPAGE LINKS */
    const navStore = document.querySelector(".nav__store");
    const navGuides = document.querySelector(".nav__guides");
    const refStore = document.querySelector(".homepageLinks__store");
    const refGuides = document.querySelector(".homepageLinks__guides");
    // try {
    //    if (navGuides && pref.content.refGuides) {
    //       refGuides.setAttribute("href", navGuides.firstChild.href);
    //    } else {
    //       refGuides.style.display = "none";
    //    }
    //    if (navStore && pref.content.refStore) {
    //       refStore.setAttribute("href", navStore.firstChild.href);
    //    } else {
    //       refStore.style.display = "none";
    //    }
    //    if (!pref.content.refGuides && !pref.content.refStore) {
    //       document.querySelector(".homepageLinks").style.display = "none";
    //    }
    // }
    // catch {}

    /* FOOTER TEXT */
    if (pref.content.textFooter) {
        document.querySelector(".footer__main_about_text").lastElementChild.innerHTML = pref.content.textFooter;
    }

    /* DARKMODE */
    let darkActive = pref.settings.darkmodeDefault;
    let darkToggle = document.getElementById("darkmodeToggle");
    document.documentElement.setAttribute("data-darkmode", darkActive);
    if (pref.settings.darkmodeToggle && !darkToggle.innerHTML) {
        darkToggle.innerHTML = darkActive ? "DARKMODE" : "LIGHTMODE";
    } else {
        darkToggle.style.display = "none";
    }
    if (pref.settings.darkmodeSystem) {
        let sysStyle = document.createElement("style");
        sysStyle.innerHTML = `
         @media screen and (prefers-color-scheme: light) {
            :root {
               --color-bg-900: var(--color-white-900);
               --color-bg-700: var(--color-white-700);
               --color-bg-500: var(--color-white-500);
               --color-border: var(--color-light-border);
               --color-text: var(--color-light-text);
               --color-title: var(--color-light-title);
            }
         }
      `;
        document.body.appendChild(sysStyle);
    }

    /* PLAYER COUNT */
    if (pref.settings.showPlayerCount) {
        document.getElementById("serverLink").firstElementChild.lastElementChild.innerHTML = "Join <span id='serverCount'>0</span> andere spelers!";
        document.getElementById("discordLink").lastElementChild.lastElementChild.innerHTML = "<span id='discordCount'>0</span> Leden online!";
        /* Fetch data */
        fetch(`https://api.minetools.eu/ping/${pref.links.server}/${pref.links.serverPORT}`).then(res => res.json()).then(data => setServerCount(data.players.online));
        fetch(`https://discordapp.com/api/guilds/${pref.links.discordID}/embed.json`).then(res => res.json()).then(data => setDiscordCount(data.presence_count));
    }

    function setServerCount(count) {
        try {
            document.getElementById("serverCount").innerHTML = count;
        } catch {}
    }

    function setDiscordCount(count) {
        try {
            document.getElementById("discordCount").innerHTML = count;
        } catch {}
    }
}