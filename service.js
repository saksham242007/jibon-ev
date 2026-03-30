document.addEventListener("click", (e) => {
  if (e.target.id === "servicesBtn") {
    e.preventDefault();
    document.getElementById("servicesMega")?.classList.toggle("show");
  }

  const mega = document.getElementById("servicesMega");
  if (mega && !mega.contains(e.target) && e.target.id !== "servicesBtn") {
    mega.classList.remove("show");
  }
});




