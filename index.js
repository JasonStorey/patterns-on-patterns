var requestAnimFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function(callback) { window.setTimeout(callback, 1000 / 60); };

function getPatternsConfig() {
    return new Promise((res, rej) => {
        $.getJSON('./patterns-config.json')
            .done(config => res(config))
            .fail(err => rej(err));
    });
}

function setupMouseMovement(mainConfig) {
    var mouseY = 0,
        layers;

    $(mainConfig.document).on('mousemove', event => mouseY = event.clientY);

    layers = mainConfig.patternsConfig.images.map(imageConfig => {
        return {
            elem: imageConfig.layer,
            midPoint: imageConfig.layer.height() / 2,
            velocityY: 0,
            currentY: Math.random() * 1000,
            drag: 0.4,
            speed: 251 - (imageConfig.speed * 250)
        };
    });

    function updateBackgroundPositions() {
        layers.forEach(layerConfig => {
            layerConfig.velocityY = (layerConfig.velocityY + (mouseY - layerConfig.midPoint) / layerConfig.speed) * (1 - layerConfig.drag);
            layerConfig.currentY += layerConfig.velocityY;
            layerConfig.elem[0].style.backgroundPosition = 'center ' + layerConfig.currentY + 'px';
        });

        requestAnimFrame(updateBackgroundPositions);
    }

    updateBackgroundPositions();
}

function createLayer(imageConfig) {
    return $('<div>').css({
        'position': 'absolute',
        'width': imageConfig.width + 'px',
        'height': '100%',
        'left': imageConfig.positionFromLeft,
        'margin-left': '-' + Math.round(imageConfig.width / 2) + 'px',
        'background-image': 'url(' + imageConfig.url + ')',
        'background-repeat': 'repeat',
        'background-position': 'centre',
        'z-index': imageConfig.zIndex
    });
}

module.exports = {
  init: mainConfig => {

      getPatternsConfig()
          .then(patternsConfig => {
              var $container = $(mainConfig.container);

              patternsConfig.images
                  .map(imageConfig => createLayer(imageConfig))
                  .forEach((layer, index) => {
                      $container.append(layer);
                      patternsConfig.images[index].layer = layer;
                  });

              mainConfig.patternsConfig = patternsConfig;

              return mainConfig;
          })
          .then(mainConfig => setupMouseMovement(mainConfig))
          .catch(err => {
              console.log(err);
          });
  }
};
