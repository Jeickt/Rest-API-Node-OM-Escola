"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

exports.index = async (req, res) => {
  try {
    const students = await _Student2.default.findAll({
      attributes:
      ['name', 'lastName', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'Id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'fileName'],
      },
    });
    return res.status(200).json(students);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Estudantes não encontrados' });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id, {
      attributes:
      ['name', 'lastName', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'Id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'fileName'],
      },
    });
    if (!student) {
      return res.status(400).json({ errors: ['ID não localizado'] });
    }
    return res.status(200).json(student);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Estudante não encontrado' });
  }
};

exports.create = async (req, res) => {
  try {
    const newStudent = await _Student2.default.create(req.body);
    return res.status(200).json(newStudent);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Estudante não criado' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id);
    if (!student) {
      return res.status(400).json({ errors: ['ID não localizado'] });
    }

    const studentUpdated = await student.update(req.body);

    return res.status(200).json(studentUpdated);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Estudante não atualizado' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id);
    if (!student) {
      return res.status(400).json({ errors: ['ID não localizado.'] });
    }

    await student.destroy();

    return res.status(200).json();
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Estudante não deletado' });
  }
};
