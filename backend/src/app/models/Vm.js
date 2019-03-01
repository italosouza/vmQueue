module.exports = (sequelize, DataTypes) => {
  const Vm = sequelize.define(
    'Vm',
    {
      name: DataTypes.STRING
    },
    {
      freezeTableName: true,
      tableName: 'vm'
    }
  )

  Vm.associate = models => {
    Vm.hasOne(models.User, { as: 'user', foreignKey: 'user_id' })
  }

  return Vm
}
