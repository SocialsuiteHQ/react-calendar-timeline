'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDom = buildDom;

var _jsdom = require('jsdom');

function buildDom(domString) {
  return new _jsdom.JSDOM('<!DOCTYPE html><body>' + domString + '></body>');
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(buildDom, 'buildDom', 'src/lib/test-utility/index.js');
}();

;