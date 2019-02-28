module.exports = (sequelize, DataTypes) => {
  const Vm = sequelize.define('Vm', {
    name: DataTypes.STRING
  })

  Vm.associate = models => {
    Vm.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
  }

  return Vm
}
