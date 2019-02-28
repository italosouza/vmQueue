const { User } = require('../models')

class UserController {
  async store(req, res) {
    const { filename: avatar } = req.file
    await User.create({ ...req.body, avatar })
    return res.json({ message: 'ok' })
  }
}

module.exports = new UserController()
