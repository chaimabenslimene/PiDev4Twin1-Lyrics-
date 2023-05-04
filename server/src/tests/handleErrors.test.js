const handleErrors = require('../utils/handleErrors');

describe('handleErrors function', () => {
  test('returns 422 and error message for ValidationError', () => {
    const err = new Error('Validation error');
    err.name = 'ValidationError';
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    handleErrors(err, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith('Validation error');
  });

  test('returns 422 and error message for CastError', () => {
    const err = new Error('Cast error');
    err.name = 'CastError';
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    handleErrors(err, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith('Cast error');
  });

  test('returns 500 for other errors', () => {
    const err = new Error('Unknown error');
    const res = {
      sendStatus: jest.fn(),
    };

    handleErrors(err, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
