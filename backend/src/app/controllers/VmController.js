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

  async join(req, res) {
    const vm = await Vm.findById(req.params.id)

    vm.user_id = req.body.user_id

    await vm.save()
    return res.json(vm)
  }

  async leave(req, res) {
    const vm = await Vm.findById(req.params.id)

    vm.user_id = ''

    await vm.save()
    return res.json(vm)
  }
}

module.exports = new VmController()
