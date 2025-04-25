import User from '../models/userModel.js';

export const saveUser = async (req, res) => {
  const { username, email, dob } = req.body;
  try {
    await User.create({ username, email, dob });
    res.send('Birthday saved!');
  } catch (err) {
    res.status(500).send('Error saving user.');
  }
};
