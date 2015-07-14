function createImageElem(imageConfig) {
    let img = document.createElement('img');
    img.setAttribute('src', imageConfig.url);
    return img;
}

function setupLoopScrolling(document) {
    $(document).scroll(() => {
        if(document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight ) {
            $(document).scrollTop(0);
        }
    });
}

function getImageConfigs() {
    return new Promise((res, rej) => {
        $.getJSON('./patterns-config.json')
            .done(config => res(config.images))
            .fail(err => rej(err));
    });
}

module.exports = {
  init: config => {
      getImageConfigs()
          .then(imageConfigs => imageConfigs.map(createImageElem))
          .then(images => images.forEach(elem => config.container.appendChild(elem)))
          .catch(err => {
              console.log(err);
          });

      setupLoopScrolling(config.document);
  }
};
