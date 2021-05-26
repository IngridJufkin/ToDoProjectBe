const { getAllTasks, createTask, deleteTask, getTodoTasks, getDoneTasks, getAllUsers, moveTask, downloadFile, deleteDoneTask, deleteTodoTask, getTasksByName} = require('../../controllers');

const spy = jest.fn(); // spy loob kunstlikult routeri
//const getSpy = jest.fn();

jest.doMock('express', () => { //fake server, expreess käib ja simuleeritakse routerit vastavalt endpointidele, server käima ei pea reaalselt
  return {
    Router() {
      return {
        get: spy,
        //get: getSpy,
        post: spy,
        delete: spy
      }
    }
  }
});

describe('router', () => { //kasutas seda ruuterit 
  require('../../router.js');
  
  test('should test GET tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(1, '/all-tasks', getAllTasks); 
  });

  test('should test POST createTask', () => {
    expect(spy).toHaveBeenNthCalledWith(6, '/createTask', createTask); 
  });

  test('should test DELETE tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(10, '/deleteTask', deleteTask);
  });

  //All router number
  test('should test ALL tasks', () => {
    expect(spy).toHaveBeenCalledTimes(11);
  });

  test('should test todo tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(2, '/todo-tasks', getTodoTasks);
  });

  test('should test done tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(3, '/done-tasks', getDoneTasks);
  });

  test('should test All Useers', () => {
    expect(spy).toHaveBeenNthCalledWith(4, '/all-users', getAllUsers); 
  });

  test('should test move tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(5, '/moveTask/:id/:toTask', moveTask);
  });

  test('should test download file', () => {
    expect(spy).toHaveBeenNthCalledWith(7, "/downloadFile", downloadFile);
  });

  test('should test Done Tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(8,"/:id/:toTask", deleteDoneTask);
  });

  test('should test delete Todo tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(9,"/:id/:toTask", deleteTodoTask);
  });


  test('should test delete Tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(10,"/deleteTask", deleteTask);
  });

  test('should test getTasks By Name with Username', () => {
    expect(spy).toHaveBeenNthCalledWith(11,"/getTasksByName/:userName", getTasksByName);
  });

 //Only router GET tasks 
  // test('should test 5 GET tasks', () => {
  //   expect(getSpy).toHaveBeenCalledTimes(5);
  // });
  
});