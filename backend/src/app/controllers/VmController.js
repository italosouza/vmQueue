const { Vm } = require('../models')

class VmController {
  async index(req, res) {
    const lista = await Vm.findAll()
    return res.json(lista)
  }

  async store(req, res) {
    await Vm.create(req.body)
    return res.json(req.body)
  }
}

module.exports = new VmController()
