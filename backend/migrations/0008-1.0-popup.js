'use strict';

const TABLE_NAME = 'popup'; // Define the table name

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          closeButtonAction: {
            type: Sequelize.STRING(31),
            allowNull: false,
          },
          popupSize: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          url: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          actionButtonText: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          headerBackgroundColor: {
            type: Sequelize.STRING(15),
            allowNull: false,
            defaultValue: '#FFFFFF',
          },
          headerColor: {
            type: Sequelize.STRING(15),
            allowNull: false,
            defaultValue: '#FFFFFF',
          },
          textColor: {
            type: Sequelize.STRING(15),
            allowNull: false,
            defaultValue: '#FFFFFF',
          },
          buttonBackgroundColor: {
            type: Sequelize.STRING(15),
            allowNull: false,
            defaultValue: '#FFFFFF',
          },
          buttonTextColor: {
            type: Sequelize.STRING(15),
            allowNull: false,
            defaultValue: '#FFFFFF',
          },
          header: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          content: {
            type: Sequelize.STRING(2047),
            allowNull: false,
          },
          actionUrl: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          repetitionType: {
            type: Sequelize.STRING(31),
            allowNull: false,
          },
        },
        { transaction }
      );

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

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Drop the guide_logs table
      await queryInterface.dropTable(TABLE_NAME, { transaction });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  },
};
