const db = require('../db')
const Todo = db.Todo
const Done = db.Done

module.exports = async function (req, res) {
  try {
  
    const result = [
      {
        title: 'Todo',
        tasks: await Todo.distinct("userName"), //exec kui callbacki ei ole siis exec taga, siis vastatakse päringule
      },
      {
        title: 'Done',
        tasks: await Done.distinct("userName"), //lean mongodb teeb findi atribuudi kiiremaks
      }
    ]

    const taskArray = Object.values(result[0]);
    const taskArray2 = Object.values(result[1]);
    const taskObject = Object.values(taskArray[1]);
    const taskObject1 = Object.values(taskArray2[1]);
    //const fullNames = [taskObject + "," + taskObject1];
    var fullNames = taskObject.concat(taskObject1); 
    const removeDuplicates = fullNames.filter((value, index) => {
      return fullNames.indexOf(value) == index
    });

    //console.log("Olen result "+ result);
    console.log("Olen TaskObject: " + fullNames);

    res.status(200).json(removeDuplicates)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




