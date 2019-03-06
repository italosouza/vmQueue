const Queue = require('../models/Queue')
const User = require('../models/User')

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
    const model = await Queue.findOneAndDelete({ user: req.userId })

    const user = await User.findById(model.user)
    req.io.emit('leave queue', { user: user })

    return res.send()
  }

  async join(req, res) {
    if (await Queue.findOne({ user: req.userId })) {
      return res.send()
    }
    const model = await Queue.create({ ...req.body, user: req.userId })
    const queue = await Queue.findById(model._id).populate('user')

    req.io.emit('join queue', queue)

    return res.json(queue)
  }
}

module.exports = new QueueController()
