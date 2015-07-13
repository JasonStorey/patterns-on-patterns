const imageSources = [
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=Buddy,&w=320&h=300',
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=don\'t&w=320&h=300',
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=buddy&w=320&h=300',
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=me,&w=320&h=300',
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=Buddy.&w=320&h=300'
];

function createImageElem(src) {
    let img = document.createElement('img');
    img.setAttribute('src', src);
    return img;
}

function setupLoopScrolling(document) {
    $(document).scroll(() => {
        if(document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight ) {
            $(document).scrollTop(0);
        }
    });
}

module.exports = {
  init: config => {
      imageSources
          .map(createImageElem)
          .forEach(elem => config.container.appendChild(elem));

      setupLoopScrolling(config.document);
  }
};
