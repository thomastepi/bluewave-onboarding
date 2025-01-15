'use strict';

const TABLE_NAME = 'helper_link'; // Define the table name

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(c, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        headerBackgroundColor: {
          type: Sequelize.STRING(7),
          allowNull: false
        },
        linkFontColor: {
          type: Sequelize.STRING(7),
          allowNull: false
        },
        iconColor: {
          type: Sequelize.STRING(7),
          defaultValue: Sequelize.NOW
        },
        createdBy: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      }, { transaction });

      // Creating indexes as per the model definition

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
  }
};
