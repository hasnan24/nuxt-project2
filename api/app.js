const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const database = require('./routes/database.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/tb_users2', (req, res) => {
  const sql = 'SELECT id, firstName, lastName, address, mail FROM persons2'

  database.query(sql, (err, result, fields) => {
    if (err) throw err
    return res.json(result)
  })
})

app.get('/tb_users2/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM persons2 WHERE id = ' + id

  database.query(sql, (err, result, fields) => {
    if (err) throw err
    return res.json(result)
  })
})

app.post('/tb_users2/add', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const nis = req.body.nis
  const gender = req.body.gender
  const address = req.body.address
  const phone = req.body.phone
  const mail = req.body.mail
  const dob = req.body.dob
  let count = ''
  if (
    firstName &&
    lastName &&
    nis &&
    gender &&
    address &&
    phone &&
    mail &&
    dob
  ) {
    const sql =
      'INSERT INTO persons2 (firstName,lastName,nis,gender,address,phone,mail,dob) VALUES ?'
    const sql2 =
      `SELECT mail, COUNT(mail) AS 'jumlah' FROM persons2 WHERE mail = '` +
      mail +
      `'`
    const value = [
      [firstName, lastName, nis, gender, address, phone, mail, dob],
    ]
    const data = {
      firstName,
      lastName,
      nis,
      gender,
      address,
      phone,
      mail,
      dob,
    }
    database.query(sql2, (errc, resultsc, fields) => {
      if (errc) throw errc
      count = resultsc[0].jumlah
      if (count === 0) {
        database.query(sql, [value], (err, result) => {
          if (err) throw err
          console.log('Successfully Register ' + firstName)
          const response = {
            response: 'Success',
            action: 'Insert',
            data,
          }
          res.json(response)
        })
      } else {
        const response = {
          response: 'Failed',
          error: 'Email has been used',
          action: 'Register',
        }
        res.json(response)
      }
    })
  } else {
    const response = {
      response: 'Failed',
      Error: 'Invalid Input',
      action: 'Register',
    }
    res.json(response)
  }
})

app.post('/tb_users2/update', (req, res) => {
  const id = req.body.id
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const nis = req.body.nis
  const gender = req.body.gender
  const address = req.body.address
  const phone = req.body.phone
  const mail = req.body.mail
  const dob = req.body.dob
  let count = ''

  if (
    firstName &&
    lastName &&
    nis &&
    gender &&
    address &&
    phone &&
    mail &&
    dob &&
    id
  ) {
    const sql =
      'UPDATE persons2 SET firstName = ?, lastName = ?, nis = ?, gender = ?, address = ?, phone = ?, mail = ?, dob = ? WHERE id = ' +
      id
    const sql2 =
      `SELECT mail, COUNT(mail) AS 'jumlah' FROM persons2 WHERE mail = '` +
      mail +
      `'`
    const updatedata = {
      firstName,
      lastName,
      nis,
      gender,
      address,
      phone,
      mail,
      dob,
      id,
    }
    database.query(sql2, (errc, resultsc, fields) => {
      if (errc) throw errc
      count = resultsc[0].jumlah
      if (count <= 1) {
        database.query(
          sql,
          [firstName, lastName, nis, gender, address, phone, mail, dob],
          (err, result) => {
            if (err) throw err
            const response = {
              response: 'Success',
              id_item: id,
              action: 'Update',
              updatedata,
            }
            console.log('Successfully Updated ' + firstName + ' Data')
            res.json(response)
          }
        )
      } else {
        const response = {
          response: 'Failed',
          error: 'Email has been used',
          action: 'Update',
        }
        res.json(response)
      }
    })
  } else {
    const response = {
      response: 'Failed',
      Error: 'Invalid Input',
      action: 'Update',
    }
    res.json(response)
  }
})

app.post('/tb_users2/delete', (req, res) => {
  const id = req.body.id
  if (id && id > 0) {
    const sql = 'DELETE FROM persons2 WHERE id = ' + id

    database.query(sql, (err, result) => {
      if (err) throw err
      console.log('Successfully Delete')
      const response = { response: 'Success', id_item: id, action: 'Delete' }
      res.json(response)
    })
  } else {
    const response = {
      response: 'Failed',
      Error: 'Invalid Input',
      action: 'Delete',
    }
    res.json(response)
  }
})

module.exports = app
