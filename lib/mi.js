'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MIRC = exports.defaultPackageJson = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _readPkg = require('read-pkg');

var _readPkg2 = _interopRequireDefault(_readPkg);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _writeJsonFile = require('write-json-file');

var _writeJsonFile2 = _interopRequireDefault(_writeJsonFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var defaultPackageJson = exports.defaultPackageJson = {
  version: "1.0.0",
  main: "index.js",
  license: "MIT"
};

var MIRC = exports.MIRC = '.mirc';

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var mircPath, hasMirc, json, projName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            mircPath = _path2.default.resolve(_os2.default.homedir(), MIRC);
            _context.next = 4;
            return _fsExtra2.default.pathExistsSync(mircPath);

          case 4:
            hasMirc = _context.sent;
            json = void 0;

            if (!hasMirc) {
              _context.next = 13;
              break;
            }

            _npmlog2.default.info('mi', 'load your .mirc file');
            _context.next = 10;
            return _readPkg2.default.sync(mircPath, { normalize: false });

          case 10:
            json = _context.sent;
            _context.next = 18;
            break;

          case 13:
            _npmlog2.default.info('mi', 'create .mirc file in your home directory');

            projName = _path2.default.basename(process.cwd());

            json = _extends({
              name: projName
            }, defaultPackageJson);
            _context.next = 18;
            return _writeJsonFile2.default.sync(mircPath, json, { indent: 2 });

          case 18:

            _npmlog2.default.info('mi', 'create package.json');
            _context.next = 21;
            return _writeJsonFile2.default.sync(_path2.default.resolve(process.cwd(), 'package.json'), json, { indent: 2 });

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](0);

            _npmlog2.default.error('mi', 'Error: ', _context.t0);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 23]]);
  }));

  function mi() {
    return _ref.apply(this, arguments);
  }

  return mi;
}();