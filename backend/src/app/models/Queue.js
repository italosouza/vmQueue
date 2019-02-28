module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define('Queue', {
    name: DataTypes.STRING
  })

  Queue.associate = models => {
    Queue.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
  }

  return Queue
}
