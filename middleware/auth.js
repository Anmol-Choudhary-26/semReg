const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(400).send('No token provided')
  }
  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, "hellomfs")
    const { id, email } = decoded
    req.user = { id, email }
    next()
  } catch (error) {
    console.log('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware
