const { User } = require('../models')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.json({ error: 'Usuário não encontrado' })
    }

    if (!(await user.checkPassword(password))) {
      return res.json({ error: 'Senha inválida' })
    }

    req.session.user = user
    return res.json({ ...user, password: '' })
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.json({ error: '' })
    })
  }
}

module.exports = new SessionController()
