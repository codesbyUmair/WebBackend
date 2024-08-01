const user = require("../model/User.schema");
const jwt = require("jsonwebtoken");

const createAdmin = async () => {
  try {
    const existingAdmin = await user.findOne({ email: 'admin@xyz.com' });

    if (!existingAdmin) {
      const admin = new user({
        name: 'Admin User',
        email: 'admin@xyz.com',
        password: 'password',
        role: 'admin',
      });

      await admin.save();
      console.log('Admin created successfully');
    } else {
      console.log('Admin already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    await createAdmin();
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const createdUser = await user.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const User = await user.findOne({ email });

    if (User) {
      if (User.isBlocked) {
        res.status(404).json({ "Message": "You are Blocked by Admin" });
      } else {
        if (User.password === password) {
          const { Password, ...rest } = User;
          const id = User._id;
          const role = User.role;

          const token = await jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '10000h' });

          switch (role) {
            case 'patient':
              res.json({ rest, "Success": true, "Message": "Patient logged in successfully", token });
              break;

            case 'doctor':
              res.json({ rest, "Success": true, "Message": "Doctor logged in successfully", token });
              break;

            case 'recipient':
              res.json({ rest, "Success": true, "Message": "Recipient logged in successfully", token });
              break;

            case 'admin':
              res.json({ rest, "Success": true, "Message": "Admin logged in successfully", token });
              break;

            default:
              res.json({ "Success": false, "Message": "Invalid role" });
          }
        } else {
          res.json({ "Success": false, "Message": "Invalid password" });
        }
      }
    } else {
      res.json({ "Success": false, "Message": "User not found" });
    }
  } catch (err) {
    res.json({ "Success": false, "Message": "User not found", err });
  }
};

module.exports = {
  createUser,
  loginUser
};
