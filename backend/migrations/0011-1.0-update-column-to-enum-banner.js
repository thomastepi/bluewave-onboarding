'use strict';

const TABLE_NAME = 'banners';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const [allBanners] = await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction });
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

        if (allBanners.length > 0) {
          await Promise.all(
            allBanners.map(async (val) => {
              await queryInterface.sequelize.query('UPDATE :table SET closeButtonAction = :action WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  action: val.closeButtonAction,
                  id: val.id,
                },
              });

              await queryInterface.sequelize.query('UPDATE :table SET repetitionType = :repetition WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  repetition: val.repetitionType,
                  id: val.id,
                },
              });

              await queryInterface.sequelize.query('UPDATE :table SET position = :position WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  position: val.position,
                  id: val.id,
                },
              });
            })
          );
        }
      } catch (e) {
        console.log(e);
        await transaction.rollback();
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const allBanners = (await queryInterface.sequelize.query(`SELECT * FROM ${TABLE_NAME}`, { transaction }))[0];

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

        if (allBanners.length > 0) {
          await Promise.all(
            allBanners.map(async (val) => {
              await queryInterface.sequelize.query('UPDATE :table SET closeButtonAction = :action WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  action: val.closeButtonAction,
                  id: val.id,
                },
              });

              await queryInterface.sequelize.query('UPDATE :table SET repetitionType = :repetition WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  repetition: val.repetitionType,
                  id: val.id,
                },
              });

              await queryInterface.sequelize.query('UPDATE :table SET position = :position WHERE id = :id', {
                transaction,
                replacements: {
                  table: TABLE_NAME,
                  position: val.position,
                  id: val.id,
                },
              });
            })
          );
        }
      } catch (e) {
        console.log(e);
        await transaction.rollback();
      }
    });
  },
};
