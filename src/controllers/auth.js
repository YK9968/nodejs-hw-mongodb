import registerUser from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const data = { name: user.name, email: user.email };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const loginUserController = async (req, res) => {};
