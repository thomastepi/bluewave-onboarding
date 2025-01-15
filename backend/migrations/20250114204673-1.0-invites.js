'use strict';

const { url } = require("inspector");

const TABLE_NAME = 'invites'; // Define the table name

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
        invitedBy: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        invitedEmail: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        actionButtonText: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        targetElement: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        tooltipPlacement: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        hintContent: {
          type: Sequelize.STRING(1024),
          allowNull: false
        },
        header :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        headerBackgroundColor :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        headerColor :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        textColor :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        buttonBackgroundColor :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        buttonTextColor :{
          type: Sequelize.STRING(255),
          allowNull: false
        },
        createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING(255),
          allowNull: true,
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
