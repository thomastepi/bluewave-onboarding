'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Banners', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        closeButtonAction: {
          type: Sequelize.STRING,
          allowNull: false
        },
        repetitionType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'show only once'
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        fontColor: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "#FFFFFF"
        },
        backgroundColor: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "#FFFFFF"
        },
        bannerText: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ""
        },
        actionUrl: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
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
      await queryInterface.dropTable('Banners', { transaction });
      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  }
};
