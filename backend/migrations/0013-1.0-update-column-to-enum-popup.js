'use strict';

const TABLE_NAME = 'popup';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allPopups] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'closeButtonAction', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'closeButtonAction',
        {
          type: Sequelize.ENUM('no action', 'open url', 'open url in a new tab'),
          allowNull: false,
          defaultValue: 'no action',
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'popupSize', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'popupSize',
        {
          type: Sequelize.ENUM('small', 'medium', 'large'),
          allowNull: false,
          defaultValue: 'small',
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'repetitionType', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'repetitionType',
        {
          type: Sequelize.ENUM('show only once', 'show every visit'),
          allowNull: false,
          defaultValue: 'show only once',
        },
        { transaction }
      );

      if (allPopups.length > 0) {
        await Promise.all(
          allPopups.map(async (val) => {
            await queryInterface.sequelize.query(
              'UPDATE :table SET closeButtonAction = :closeButtonAction WHERE id = :id',
              {
                replacements: {
                  table: TABLE_NAME,
                  closeButtonAction: val.closeButtonAction,
                  id: val.id,
                },
                transaction,
              }
            );

            await queryInterface.sequelize.query('UPDATE :table SET popupSize = :popupSize WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                popupSize: val.popupSize,
                id: val.id,
              },
              transaction,
            });

            await queryInterface.sequelize.query('UPDATE :table SET repetitionType = :repetitionType WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                repetitionType: val.repetitionType,
                id: val.id,
              },
              transaction,
            });
          })
        );
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const [allPopups] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'closeButtonAction', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'closeButtonAction',
        {
          type: Sequelize.STRING(31),
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'popupSize', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'popupSize',
        {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'repetitionType', { transaction });

      await queryInterface.addColumn(
        TABLE_NAME,
        'repetitionType',
        {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        { transaction }
      );

      if (allPopups.length > 0) {
        await Promise.all(
          allPopups.map(async (val) => {
            await queryInterface.sequelize.query(
              'UPDATE :table SET closeButtonAction = :closeButtonAction WHERE id = :id',
              {
                replacements: {
                  table: TABLE_NAME,
                  closeButtonAction: val.closeButtonAction,
                  id: val.id,
                },
                transaction,
              }
            );

            await queryInterface.sequelize.query('UPDATE :table SET popupSize = :popupSize WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                popupSize: val.popupSize,
                id: val.id,
              },
              transaction,
            });

            await queryInterface.sequelize.query('UPDATE :table SET repetitionType = :repetitionType WHERE id = :id', {
              replacements: {
                table: TABLE_NAME,
                repetitionType: val.repetitionType,
                id: val.id,
              },
              transaction,
            });
          })
        );
      }
    });
  },
};
