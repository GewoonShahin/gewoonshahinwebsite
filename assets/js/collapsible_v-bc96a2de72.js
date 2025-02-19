const collapsibles = document.querySelectorAll('.collapsible__title');

collapsibles.forEach(element => element.addEventListener("click", () => {
   element.nextElementSibling.classList.toggle("open");
   element.lastElementChild.classList.toggle("open");
}));