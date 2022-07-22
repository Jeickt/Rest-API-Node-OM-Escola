"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const upload = _multer2.default.call(void 0, _multer4.default).single('photo');

exports.create = (req, res) => upload(req, res, async (err) => {
  if (err) {
    return res.status(400).json({ errors: [err.code] });
  }

  try {
    const { originalname, filename } = req.file;
    const { studentId } = req.body;
    const photo = await _Photo2.default.create({ originalName: originalname, fileName: filename, studentId });

    return res.status(200).json(photo);
  } catch (e) {
    return res.status(400).json({ errors: ['O estudante não existe'] });
  }
});
