"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'john@gmail.com',
      passwordHash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Lyan Doe',
      email: 'lyan@gmail.com',
      passwordHash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Mary Doe',
      email: 'mary@gmail.com',
      passwordHash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    ], {});
  },

  down() {},
};
