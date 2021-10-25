const express = require('express')
const router = express.Router()
const book = require('./book')

//하위 처리 로직 todo
router.use('/books', book) // api/todos/edit app.get('/edit')

module.exports = router
 