const { Queue } = require('../models')

class QueueController {
  async index(req, res) {
    const lista = await Queue.findAll()
    return res.json(lista)
  }

  async store(req, res) {
    await Queue.create(req.body)
    return res.json(req.body)
  }
}

module.exports = new QueueController()
