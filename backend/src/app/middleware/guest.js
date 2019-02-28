module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }

  return res.json({ error: 'não autenticado' })
}
