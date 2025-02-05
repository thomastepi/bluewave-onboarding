const db = require('../models');

const Tour = db.Tour;
const TourStep = db.TourStep;

class TourService {
  async getAllTours() {
    return await Tour.findAll();
  }

  async getTourById(id) {
    return await Tour.findByPk(id);
  }

  async getTourByUserId(userId) {
    return await Tour.findAll({
      where: {
        createdBy: userId,
      },
    });
  }

  async createTour(data) {
    const { steps, ...info } = data;
    const transaction = await db.sequelize.transaction();
    try {
      const newTour = await Tour.create(info, {
        transaction,
        returning: true,
      });
      const formattedSteps = steps.map((step) => ({
        ...step,
        tourId: newTour.id,
      }));
      await TourStep.bulkCreate(formattedSteps, { transaction });
      await transaction.commit();
      return newTour;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateTour(id, data) {
    const { steps, ...info } = data;
    const transaction = await db.sequelize.transaction();
    try {
      await Tour.update(info, {
        where: { id },
        transaction,
      });
      await TourStep.destroy({ where: { tourId: id }, transaction });
      const formattedSteps = steps.map((step) => ({
        ...step,
        tourId: id,
      }));
      await TourStep.bulkCreate(formattedSteps, { transaction });
      await transaction.commit();
      return await this.getTourById(id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteTour(id) {
    const transaction = await db.sequelize.transaction();
    try {
      await TourStep.destroy({ where: { tourId: id }, transaction });
      const rowsAffected = await Tour.destroy({
        where: { id },
        transaction,
      });
      await transaction.commit();
      return rowsAffected !== 0;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new TourService();
