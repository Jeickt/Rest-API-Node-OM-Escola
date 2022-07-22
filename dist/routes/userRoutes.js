"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// router.get('/users', user.index);
// router.get('/users/:id', user.show);
router.post('/users', _UserController2.default.create);
router.put('/users/', _loginRequired2.default, _UserController2.default.update);
router.delete('/users/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;
