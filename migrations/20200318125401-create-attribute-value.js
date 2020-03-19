module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attribute_value', {
      attribute_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'attribute',
          key: 'attribute_id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attribute_value');
  }
};