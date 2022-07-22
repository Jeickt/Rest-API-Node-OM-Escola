"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _urlConfig = require('../config/urlConfig'); var _urlConfig2 = _interopRequireDefault(_urlConfig);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalName: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome original do arquivo não pode ser vazio',
          },
        },
      },
      fileName: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome do arquivo não pode ser vazio',
          },
        },
      },
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_urlConfig2.default.mainUrl}/images/${this.getDataValue('fileName')}`;
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'studentId' });
  }
} exports.default = Photo;
