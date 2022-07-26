import multer from 'multer';

import multerConfig from '../config/multer';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

exports.create = (req, res) => upload(req, res, async (err) => {
  if (err) {
    return res.status(400).json({ errors: [err.code] });
  }

  try {
    const { originalname, filename } = req.file;
    const { studentId } = req.body;
    const photo = await Photo.create({ originalName: originalname, fileName: filename, studentId });

    return res.status(200).json(photo);
  } catch (e) {
    return res.status(400).json(e);
    // { errors: ['O estudante não existe'] }
  }
});
