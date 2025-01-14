'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('guide_logs', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        guideType: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        guideId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        showingTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        completed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      }, { transaction });

      // Creating indexes as per the model definition
      await queryInterface.addIndex('guide_logs', ['userId'], { name: 'idx_guide_logs_userId', transaction });
      await queryInterface.addIndex('guide_logs', ['guideId'], { name: 'idx_guide_logs_guideId', transaction });
      await queryInterface.addIndex('guide_logs', ['guideType'], { name: 'idx_guide_logs_guideType', transaction });
      await queryInterface.addIndex('guide_logs', ['userId', 'guideId', 'guideType'], { name: 'idx_guide_logs_userId_guideId_guideType', unique: false, transaction });
      await queryInterface.addIndex('guide_logs', ['showingTime'], { name: 'idx_guide_logs_showingTime', transaction });

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
      await queryInterface.dropTable('guide_logs', { transaction });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  }
};
