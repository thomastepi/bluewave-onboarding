'use strict';

const TABLE_NAME = 'tokens';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allTokens] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'type', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'type',
        {
          type: Sequelize.ENUM('auth', 'reset'),
          allowNull: false,
          defaultValue: 'auth',
        },
        { transaction }
      );

      if (allTokens.length > 0) {
        await Promise.all(
          allTokens.map(async (val) => {
            await queryInterface.sequelize.query('UPDATE :table SET type = :type WHERE id = :id', {
              replacements: { table: TABLE_NAME, type: val.type, id: val.id },
              transaction,
            });
          })
        );
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allTokens] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });

      await queryInterface.removeColumn(TABLE_NAME, 'type', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'type',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      if (allTokens.length > 0) {
        await Promise.all(
          allTokens.map(async (val) => {
            await queryInterface.sequelize.query('UPDATE :table SET type = :type WHERE id = :id', {
              replacements: { table: TABLE_NAME, type: val.type, id: val.id },
              transaction,
            });
          })
        );
      }
    });
  },
};
