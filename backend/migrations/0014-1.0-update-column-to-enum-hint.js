'use strict';

const TABLE_NAME = 'hints';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allHints] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'action', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'action',
        {
          type: Sequelize.ENUM('no action', 'open url', 'open url in a new tab'),
          allowNull: false,
          defaultValue: 'no action',
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'tooltipPlacement', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'tooltipPlacement',
        {
          type: Sequelize.ENUM('top', 'right', 'bottom', 'left'),
          allowNull: false,
          defaultValue: 'top',
        },
        { transaction }
      );

      if (allHints.length > 0) {
        await Promise.all(
          allHints.map(async (val) => {
            await queryInterface.sequelize.query('UPDATE :table SET action = :action WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                action: val.action,
                id: val.id,
              },
              transaction,
            });

            await queryInterface.sequelize.query(
              'UPDATE :table SET tooltipPlacement = :tooltipPlacement WHERE id = :id',
              {
                replacements: {
                  table: TABLE_NAME,
                  tooltipPlacement: val.tooltipPlacement,
                  id: val.id,
                },
                transaction,
              }
            );
          })
        );
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allHints] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'action', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'action',
        {
          type: Sequelize.STRING(31),
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'tooltipPlacement', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'tooltipPlacement',
        {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        { transaction }
      );

      if (allHints.length > 0) {
        await Promise.all(
          allHints.map(async (val) => {
            await queryInterface.sequelize.query('UPDATE :table SET action = :action WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                action: val.action,
                id: val.id,
              },
              transaction,
            });

            await queryInterface.sequelize.query(
              'UPDATE :table SET tooltipPlacement = :tooltipPlacement WHERE id = :id',
              {
                replacements: {
                  table: TABLE_NAME,
                  tooltipPlacement: val.tooltipPlacement,
                  id: val.id,
                },
                transaction,
              }
            );
          })
        );
      }
    });
  },
};
