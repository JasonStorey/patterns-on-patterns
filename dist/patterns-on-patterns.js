(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PONP = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function getPatternsConfig() {
    return new Promise(function (res, rej) {
        $.getJSON('./patterns-config.json').done(function (config) {
            return res(config);
        }).fail(function (err) {
            return rej(err);
        });
    });
}

function setupMouseMovement(mainConfig) {
    var mouseY = 0,
        layers;

    $(mainConfig.document).on('mousemove', function (event) {
        return mouseY = event.clientY;
    });

    layers = mainConfig.patternsConfig.images.map(function (imageConfig) {
        return {
            elem: imageConfig.layer,
            midPoint: imageConfig.layer.height() / 2,
            velocityY: 0,
            currentY: Math.random() * 1000,
            drag: 0.4,
            speed: 251 - imageConfig.speed * 250
        };
    });

    function updateBackgroundPositions() {
        layers.forEach(function (layerConfig) {
            layerConfig.velocityY = getYVelocity(layerConfig.velocityY, mouseY, layerConfig.midPoint, layerConfig.speed) * (1 - layerConfig.drag);
            layerConfig.currentY += layerConfig.velocityY;
            layerConfig.elem.css('background-position', 'center ' + layerConfig.currentY + 'px');
        });

        requestAnimFrame(updateBackgroundPositions);
    }

    updateBackgroundPositions();
}

function getYVelocity(velocityY, mouseY, midY, speed) {
    var deltaY = mouseY - midY;
    return velocityY + deltaY / speed;
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
    init: function init(mainConfig) {

        getPatternsConfig().then(function (patternsConfig) {
            var $container = $(mainConfig.container);

            patternsConfig.images.map(function (imageConfig) {
                return createLayer(imageConfig);
            }).forEach(function (layer, index) {
                $container.append(layer);
                patternsConfig.images[index].layer = layer;
            });

            mainConfig.patternsConfig = patternsConfig;

            return mainConfig;
        }).then(function (mainConfig) {
            return setupMouseMovement(mainConfig);
        })['catch'](function (err) {
            console.log(err);
        });
    }
};

},{}]},{},[1])(1)
});