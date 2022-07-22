import User from '../models/User';

exports.index = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
    return res.status(200).json(users);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Usuários não encontrados' });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ errors: ['ID não localizado'] });
    }

    const { name, email } = user;
    return res.status(200).json({ id, name, email });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }
};

exports.create = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const { id, name, email } = newUser;
    return res.status(200).json({ id, name, email });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Usuário não criado' });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({ errors: ['ID não localizado'] });
    }

    const userUpdated = await user.update(req.body);
    const { id, name, email } = userUpdated;

    return res.status(200).json({ id, name, email });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Usuário não atualizado' });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({ errors: ['ID não localizado.'] });
    }

    await user.destroy();

    return res.status(200).json();
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: 'Usuário não deletado' });
  }
};
