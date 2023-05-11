const { promote, demote } = require('../controllers/users.controller');
const Users = require('../models/users.model');

jest.mock('../models/users.model');

describe('promote function', () => {
  test('promotes user with valid role', async () => {
    const user = { _id: '123', role: 1 };
    const req = {
      body: {
        id: '123',
        promote: true,
      },
    };
    const res = {
      send: jest.fn(),
    };
    Users.findById.mockResolvedValue(user);
    Users.findByIdAndUpdate.mockResolvedValue();

    await promote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(Users.findByIdAndUpdate).toHaveBeenCalledWith('123', {
      role: 2,
      isAskingPromotion: false,
    });
    expect(res.send).toHaveBeenCalledWith('Promoted to 2');
  });

  test('rejects promotion with valid role', async () => {
    const user = { _id: '123', role: 1 };
    const req = {
      body: {
        id: '123',
        promote: false,
      },
    };
    const res = {
      send: jest.fn(),
    };
    Users.findById.mockResolvedValue(user);
    Users.findByIdAndUpdate.mockResolvedValue();

    await promote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(Users.findByIdAndUpdate).toHaveBeenCalledWith('123', {
      isAskingPromotion: false,
    });
    expect(res.send).toHaveBeenCalledWith('Promotion rejected');
  });

  test('returns 204 for invalid role', async () => {
    const user = { _id: '123', role: 3 };
    const req = {
      body: {
        id: '123',
        promote: true,
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    Users.findById.mockResolvedValue(user);

    await promote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  test('handles errors', async () => {
    const req = {
      body: {
        id: '123',
        promote: true,
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const error = new Error('Database error');
    Users.findById.mockRejectedValue(error);

    await promote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

// jest.mock('../models/users.model');

describe('demote function', () => {
  test('demotes user with valid role', async () => {
    const user = { _id: '123', role: 2 };
    const req = {
      body: {
        id: '123',
      },
    };
    const res = {
      send: jest.fn(),
    };
    Users.findById.mockResolvedValue(user);
    Users.findByIdAndUpdate.mockResolvedValue();

    await demote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(Users.findByIdAndUpdate).toHaveBeenCalledWith('123', {
      role: 1,
    });
    expect(res.send).toHaveBeenCalledWith('Demoted to 1');
  });

  test('rejects demotion with invalid role', async () => {
    const user = { _id: '123', role: 0 };
    const req = {
      body: {
        id: '123',
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    Users.findById.mockResolvedValue(user);

    await demote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  test('handles errors', async () => {
    const req = {
      body: {
        id: '123',
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const error = new Error('Database error');
    Users.findById.mockRejectedValue(error);

    await demote(req, res);

    expect(Users.findById).toHaveBeenCalledWith('123');
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
