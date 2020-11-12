const mysql = require('mysql')

const conmysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
})

conmysql.connect((error) => {
  if (error) throw error
  console.log('Connected to Database ')
})

module.exports = conmysql
