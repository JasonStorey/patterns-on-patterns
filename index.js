const imageSources = ['https://placeholdit.imgix.net/~text?txtsize=33&txt=Buddy?&w=320&h=500'];

function createImageElem(src) {
    let img = document.createElement('img');
    img.setAttribute('src', src);
    return img;
}

module.exports = {
  init: config => {
      imageSources
          .map(createImageElem)
          .forEach(elem => config.container.appendChild(elem));
  }
};
