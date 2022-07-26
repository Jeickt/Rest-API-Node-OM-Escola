import Student from '../models/Student';
import Photo from '../models/Photo';

exports.index = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes:
      ['name', 'lastName', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'Id', 'DESC']],
      include: {
        model: Photo,
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
    const student = await Student.findByPk(id, {
      attributes:
      ['name', 'lastName', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'Id', 'DESC']],
      include: {
        model: Photo,
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
    const newStudent = await Student.create(req.body);
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
    const student = await Student.findByPk(id);
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
    const student = await Student.findByPk(id);
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
