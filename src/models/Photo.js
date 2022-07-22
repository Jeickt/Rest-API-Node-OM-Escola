import Sequelize, { Model } from 'sequelize';
import urlConfig from '../config/urlConfig';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalName: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome original do arquivo não pode ser vazio',
          },
        },
      },
      fileName: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome do arquivo não pode ser vazio',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${urlConfig.mainUrl}/images/${this.getDataValue('fileName')}`;
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
}
