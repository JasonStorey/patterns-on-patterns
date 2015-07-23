function getPatternsConfig() {
    return new Promise((res, rej) => {
        $.getJSON('./patterns-config.json')
            .done(config => res(config))
            .fail(err => rej(err));
    });
}

function setupMouseMovement(mainConfig) {
    var $container = $(mainConfig.container),
        midPoint = $container.height() / 2,
        velocityY = 0,
        currentY = 0,
        drag = 0.4;

    $(mainConfig.document).on('mousemove', (event) => {
        velocityY = getYVelocity(velocityY, event.clientY, midPoint) * (1 - drag);
    });

    function updateBackgroundPosition() {
        currentY += velocityY;
        $container.css('background-position', 'center ' + currentY + 'px');
        setTimeout(updateBackgroundPosition, 16);
    }

    updateBackgroundPosition();
}

function getYVelocity(velocityY, mouseY, midY) {
    var deltaY = mouseY - midY;
    return velocityY + (deltaY / 10);
}

module.exports = {
  init: mainConfig => {

      getPatternsConfig()
          .then(patternsConfig => {
              mainConfig.patternsConfig = patternsConfig;

              $(mainConfig.container).css({
                  'background-image': 'url(' + patternsConfig.images[0].url + ')',
                  'background-repeat': 'repeat-y',
                  'background-position': 'centre'
              });

              return mainConfig;
          })
          .then(mainConfig => setupMouseMovement(mainConfig))
          .catch(err => {
              console.log(err);
          });
  }
};
