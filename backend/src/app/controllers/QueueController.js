const Queue = require('../models/Queue')

class QueueController {
  async index(req, res) {
    const filters = {}

    const list = await Queue.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['user'],
      sort: '-createdAt'
    })

    return res.json(list)
  }

  async show(req, res) {
    const model = await Queue.findById(req.params.id)

    return res.json(model)
  }

  async leave(req, res) {
    await Queue.findOneAndDelete({ user: req.userId })

    return res.send()
  }

  async join(req, res) {
    if (await Queue.findOne({ user: req.userId })) {
      return res.send()
    }
    const model = await Queue.create({ ...req.body, user: req.userId })

    return res.json(model)
  }
}

module.exports = new QueueController()
