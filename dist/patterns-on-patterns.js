(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PONP = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function createImageElem(imageConfig) {
    var img = document.createElement('img');
    img.setAttribute('src', imageConfig.url);
    return img;
}

function setupLoopScrolling(document, patternsConfig) {
    $(document).scroll(function () {
        if ($(document).scrollTop() >= patternsConfig.height) {
            $(document).scrollTop(0);
        }
    });
    return patternsConfig;
}

function getPatternsConfig() {
    return new Promise(function (res, rej) {
        $.getJSON('./patterns-config.json').done(function (config) {
            return res(config);
        }).fail(function (err) {
            return rej(err);
        });
    });
}

module.exports = {
    init: function init(config) {

        getPatternsConfig().then(function (patternsConfig) {
            return setupLoopScrolling(config.document, patternsConfig);
        }).then(function (patternsConfig) {
            return patternsConfig.images.concat(patternsConfig.images);
        }).then(function (imagesConfig) {
            return imagesConfig.map(createImageElem);
        }).then(function (images) {
            return images.forEach(function (elem) {
                return config.container.appendChild(elem);
            });
        })['catch'](function (err) {
            console.log(err);
        });
    }
};

},{}]},{},[1])(1)
});