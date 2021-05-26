const { getAllTasks, createTask, deleteTask } = require('../../controllers');

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
    expect(spy).toHaveBeenNthCalledWith(5, '/createTask', createTask); 
  });

  test('should test DELETE tasks', () => {
    expect(spy).toHaveBeenNthCalledWith(9, '/deleteTask', deleteTask);
  });

  //All router number
  test('should test ALL tasks', () => {
    expect(spy).toHaveBeenCalledTimes(10);
  });

 //Only router GET tasks 
  // test('should test 5 GET tasks', () => {
  //   expect(getSpy).toHaveBeenCalledTimes(5);
  // });
  
});