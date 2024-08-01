const user = require('../model/User.schema');

const addRecipient = async (req, res) => {
  try {
    const existingRecipient = await user.findOne({ role: 'recipient' });

    if (existingRecipient) {
      return res.status(400).json({ message: 'Recipient already exists. Admin can add only one recipient.' });
    }

    const { email, password, role } = req.body;

    const createdRecipient = await user.create({
      email,
      password,
      role,
    });

    res.status(201).json(createdRecipient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addRecipient };
