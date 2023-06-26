const images = document.querySelectorAll(".card-image");

images.forEach((el, i) => {
    el.style.backgroundImage = `url("./img/servicesCards/photo${i+1}.svg")`;
})