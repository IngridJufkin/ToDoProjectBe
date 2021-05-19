const getSpy = jest.fn();
const postSpy = jest.fn();
const deleteSpy = jest.fn();
jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        delete: deleteSpy
      }
    }
  }
});

describe('router', () => {

  require('../../router');

  test('should call get method 5 times', () => {
    expect(getSpy).toHaveBeenCalledTimes(5);

  });

});

