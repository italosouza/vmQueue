module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define(
    'Queue',
    {},
    {
      freezeTableName: true,
      tableName: 'queue'
    }
  )

  Queue.associate = models => {
    Queue.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
  }

  return Queue
}
