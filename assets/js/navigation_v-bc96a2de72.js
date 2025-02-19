menuBtn = document.getElementById("mobileMenuBtn");
closeBtn = document.getElementById("mobileCloseBtn");
mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
   mobileNav.style = "width: 0%; display: block;";
   setTimeout(() => {
      mobileNav.style = "width: 75%; display: block;";
   }, 10);
});
closeBtn.addEventListener("click", () => {
   mobileNav.style = "width: 0%; display: block;";
   setTimeout(() => {
      mobileNav.style = "width: 0%; display: none;";
   }, 500);
});

/* CLEAR UNSUPPORTED SOCIALS FROM TOP NAVBAR */
document.querySelectorAll(".socialNavTop").forEach((el) => {
   SUPPORTED_SOCIALS = ["facebook", "github", "instagram", "linkedin", "mastodon", "pinterest", "youtube", "twitter", "discord", "twitch", "tiktok"];

   if (!SUPPORTED_SOCIALS.includes(el.classList[0].split("__")[1])) {
      el.style.display = "none";
   }
});

/* SERVER COPY FUNCTIONALITY */
serverBtn = document.getElementById("serverLink");
closePopupBtn = document.getElementById("closePopup");
popup = document.querySelector(".popup");
popupBack = document.querySelector(".popupBack");

serverBtn.addEventListener("click", () => {
   popupDisplay(popup, popupBack, "block");
   copyTextToClipboard(document.getElementById("serverText").dataset.ip)
});
closePopupBtn.addEventListener("click", () => popupDisplay(popup, popupBack, "none"));

function popupDisplay(pop, popBack, value) {
   pop.style.display = value;
   popBack.style.display = value;
}

function fallbackCopyTextToClipboard(text) {
   var textArea = document.createElement("textarea");
   textArea.value = text;
   textArea.style.top = "0";
   textArea.style.left = "0";
   textArea.style.position = "fixed";
 
   document.body.appendChild(textArea);
   textArea.focus();
   textArea.select();
 
   try {
     var successful = document.execCommand('copy');
     var msg = successful ? 'successful' : 'unsuccessful';
     console.log('Fallback: Copying text command was ' + msg);
   } catch (err) {
     console.error('Fallback: Oops, unable to copy', err);
   }
 
   document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
   if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
   }
   navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
   }, function(err) {
      console.error('Async: Could not copy text: ', err);
   });
}

/* DARKMODE TOGGLE */
const darkToggle = document.getElementById("darkmodeToggle");
const lightmodeCSS = `
   :root {
      --color-bg-900: var(--color-white-900);
      --color-bg-700: var(--color-white-700);
      --color-bg-500: var(--color-white-500);
      --color-border: var(--color-light-border);
      --color-text: var(--color-light-text);
      --color-title: var(--color-light-title);
   }
`;
darkToggle.addEventListener("click", () => {
   if (darkToggle.innerHTML == "DARKMODE") {
      darkToggle.innerHTML = "LIGHTMODE";
      document.documentElement.setAttribute("data-darkmode", "false");
      darkActive = false;
   } else {
      darkToggle.innerHTML = "DARKMODE";
      document.documentElement.setAttribute("data-darkmode", "true");
      darkActive = true;
   }
});