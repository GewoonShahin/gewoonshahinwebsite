active = "";

function selectInitialize() {
   firstSelector = document.querySelector(".selector");
   firstArticle = getArticle(firstSelector.id);

   activateSelector(firstSelector, firstArticle);
}
selectInitialize();

function getArticle(id) {
   return document.getElementById("article-" + id);
}

function activateSelector(selector, article) {
   try {
      document.querySelector(".selector--active").classList.remove("selector--active");
      document.querySelector(".article--active").classList.remove("article--active");
   }
   catch {
      /* DO NOTHING */
   }
   finally {
      selector.classList.add("selector--active");
      article.classList.add("article--active");
   }
}

document.querySelectorAll(".selector").forEach(s => s.addEventListener("click", e => {
   activateSelector(s, getArticle(s.id));
}));

/* NUMBER FORMATTING */
document.querySelectorAll(".selector__number").forEach(n => n.innerHTML = formatNumber(parseInt(n.innerHTML)));
function formatNumber(num) {
   if (num > 9) {
      return num.toString()
   } else {
      return "0" + num.toString()
   }
}