const app = require('../app')

app.get('/api', (req, res) => {
  res.status(200).send('Hello')
})

module.exports = app
