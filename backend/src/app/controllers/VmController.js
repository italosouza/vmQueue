const { Vm } = require('../models')

class VmController {
  async index(req, res) {
    const lista = await Vm.findAll()
    return res.json(lista)
  }

  async store(req, res) {
    const { filename: avatar } = req.file
    await Vm.create({ ...req.body, avatar })
    return res.json('store')
  }
}

module.exports = new VmController()
