(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PONP = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
    var $container = $(mainConfig.container),
        midPoint = $container.height() / 2,
        velocityY = 0,
        currentY = 0,
        drag = 0.4;

    $(mainConfig.document).on('mousemove', function (event) {
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
    return velocityY + deltaY / 10;
}

module.exports = {
    init: function init(mainConfig) {

        getPatternsConfig().then(function (patternsConfig) {
            mainConfig.patternsConfig = patternsConfig;

            $(mainConfig.container).css({
                'background-image': 'url(' + patternsConfig.images[0].url + ')',
                'background-repeat': 'repeat-y',
                'background-position': 'centre'
            });

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