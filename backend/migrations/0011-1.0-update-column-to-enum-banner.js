'use strict';

const TABLE_NAME = 'banners';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const allBanners = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
      await queryInterface.removeColumn(TABLE_NAME, 'closeButtonAction', { transaction });

      // Add the new column with ENUM type
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

      await queryInterface.removeColumn(TABLE_NAME, 'repetitionType', { transaction });

      // Add the new column with ENUM type
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

      await queryInterface.removeColumn(TABLE_NAME, 'position', { transaction });

      // Add the new column with ENUM type
      await queryInterface.addColumn(
        TABLE_NAME,
        'position',
        {
          type: Sequelize.ENUM('top', 'bottom'),
          allowNull: false,
          defaultValue: 'top',
        },
        { transaction }
      );

      allBanners.forEach(async (val) => {
        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET closeButtonAction = '${val.closeButtonAction}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );

        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET repetitionType = '${val.repetitionType}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );

        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET position = '${val.position}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const allTokens = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });

      await queryInterface.removeColumn(TABLE_NAME, 'closeButtonAction', { transaction });

      // Add the column back as a STRING
      await queryInterface.addColumn(
        TABLE_NAME,
        'closeButtonAction',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'no action',
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'repetitionType', { transaction });

      // Add the column back as a STRING
      await queryInterface.addColumn(
        TABLE_NAME,
        'repetitionType',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'show only once',
        },
        { transaction }
      );

      await queryInterface.removeColumn(TABLE_NAME, 'position', { transaction });

      // Add the column back as a STRING
      await queryInterface.addColumn(
        TABLE_NAME,
        'position',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'top',
        },
        { transaction }
      );

      allTokens.forEach(async (val) => {
        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET closeButtonAction = '${val.closeButtonAction}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );

        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET repetitionType = '${val.repetitionType}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );

        await queryInterface.sequelize.query(
          `UPDATE ${TABLE_NAME} SET position = '${val.position}' WHERE id = ${val.id}`,
          {
            transaction,
          }
        );
      });
    });
  },
};
