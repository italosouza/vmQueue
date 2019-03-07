const Vm = require('../models/Vm')

const QueueJob = require('../jobs/QueueJob')
const Queue = require('../services/Queue')

class VmController {
  async index(req, res) {
    const filters = {}

    if (req.query.available) {
      filters.available = req.query.available
    }

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, 'i')
    }

    const list = await Vm.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['user'],
      sort: '-createdAt'
    })

    return res.json(list)
  }

  async show(req, res) {
    const model = await Vm.findById(req.params.id)

    return res.json(model)
  }

  async store(req, res) {
    const model = await Vm.create(req.body)

    return res.json(model)
  }

  async update(req, res) {
    const model = await Vm.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(model)
  }

  async destroy(req, res) {
    await Vm.findByIdAndDelete(req.params.id)

    return res.send()
  }

  async join(req, res) {
    if (await Vm.findOne({ user: req.userId })) {
      return res.send()
    }

    const model = await Vm.findByIdAndUpdate(
      req.params.id,
      { user: req.userId, available: false },
      {
        new: true
      }
    )

    req.io.emit('vm join', model)

    return res.json(model)
  }

  async leave(req, res) {
    const model = await Vm.findByIdAndUpdate(
      req.params.id,
      { user: null, available: true },
      {
        new: true
      }
    )

    Queue.create(QueueJob.key, {
      vm: model
    }).save()

    req.io.emit('vm leave', model)

    return res.json(model)
  }
}

module.exports = new VmController()
