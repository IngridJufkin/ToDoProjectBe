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

  test('should call get method 6 times', () => {
    expect(getSpy).toHaveBeenCalledTimes(6);

  });

});

