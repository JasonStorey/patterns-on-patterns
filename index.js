function createImageElem(imageConfig) {
    let img = document.createElement('img');
    img.setAttribute('src', imageConfig.url);
    return img;
}

function setupLoopScrolling(document, patternsConfig) {
    $(document).scroll(() => {
        if($(document).scrollTop() >= patternsConfig.height) {
            $(document).scrollTop(0);
        }
    });
    return patternsConfig;
}

function getPatternsConfig() {
    return new Promise((res, rej) => {
        $.getJSON('./patterns-config.json')
            .done(config => res(config))
            .fail(err => rej(err));
    });
}

module.exports = {
  init: config => {

      getPatternsConfig()
          .then(patternsConfig => setupLoopScrolling(config.document, patternsConfig))
          .then(patternsConfig => patternsConfig.images.concat(patternsConfig.images))
          .then(imagesConfig => imagesConfig.map(createImageElem))
          .then(images => images.forEach(elem => config.container.appendChild(elem)))
          .catch(err => {
              console.log(err);
          });
  }
};
