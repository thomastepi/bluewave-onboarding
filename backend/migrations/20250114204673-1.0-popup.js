'use strict';
const { title } = require('process');
const settings = require('../config/settings');

const TABLE_NAME = 'popup'; // Define the table name

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(TABLE_NAME, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        closeButtonAction: {
          type: Sequelize.STRING(255),
          allowNull: false,
          validate: {
            isIn: [["no-action", "open-url", "close-popup", "open-url-new-tab"]],
          },
        },
        popupSize: {
          type: Sequelize.STRING(255),
          allowNull: false,
          validate: {
            isIn: [["small", "medium", "large"]],
          },
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
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "#FFFFFF",
        },
        headerColor: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "#FFFFFF",
        },
        textColor: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "#FFFFFF",
        },
        buttonBackgroundColor: {
          type: Sequelize.STRIN(255),
          allowNull: false,
          defaultValue: "#FFFFFF",
        },
        buttonTextColor: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "#FFFFFF",
        },
        header: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(1024),
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
            model: 'Users',
            key: 'id'
          }
        },
        repetitionType: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
      }, { transaction });

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
