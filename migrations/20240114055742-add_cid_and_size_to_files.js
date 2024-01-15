module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Files", "cid", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Files", "size", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Files", "cid");
    await queryInterface.removeColumn("Files", "size");
  },
};
