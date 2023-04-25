import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.use('*', (req, res, next) => next(res.json({ message: 'Error 404' })))
