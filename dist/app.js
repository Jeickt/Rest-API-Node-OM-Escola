"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
require('./database/connection');
var _path = require('path');
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _studentRoutes = require('./routes/studentRoutes'); var _studentRoutes2 = _interopRequireDefault(_studentRoutes);

const securedUrlList = [process.env.APP_URL_FRONTEND, process.env.APP_URL_FRONTEND_DEV];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || securedUrlList.indexOf(origin) !== -1) cb(null, true);
    else cb(new Error('Não permitido por CORS'));
  },
};

_dotenv2.default.config();

const app = _express2.default.call(void 0, );

app.use(_cors2.default.call(void 0, corsOptions));
app.use(_helmet2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads')));

// app.use(middleware);
app.use(_homeRoutes2.default);
app.use(_photoRoutes2.default);
app.use(_userRoutes2.default);
app.use(_tokenRoutes2.default);
app.use(_studentRoutes2.default);

exports. default = app;
