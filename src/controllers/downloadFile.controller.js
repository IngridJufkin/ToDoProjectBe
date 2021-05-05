const db = require('../db')
const Todo = db.Todo
const Done = db.Done

const excelGenerator = require('./../helpers/excelGenerator') //impordin excelgeneratori
const pdfGenerator = require('./../helpers/pdfGenerator')

module.exports = async function (req, res) {
  try {
    const result = {
      todoTasks: req.body.todo ? await Todo.find({}).lean().exec() : [],
      doneTasks: req.body.done ? await Done.find({}).lean().exec() : []
    }

    if (req.body.fileType === 'XLSX') {
      excelGenerator(result, res) //kutsun välja funktsiooni
    }

    if (req.body.fileType === 'PDF') {
      pdfGenerator(result, res)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
