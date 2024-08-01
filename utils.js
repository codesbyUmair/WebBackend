const jwt = require('jsonwebtoken');

const verify = async (req, res, next) => {
  let token = req.headers.token;
  try {
    let DecodedData = await jwt.verify(token, process.env.SECRET_KEY);

    if (DecodedData) {
      let user = {
        id: DecodedData.I,
        email: DecodedData.E,
        name: DecodedData.U,
        role: DecodedData.R,
      };

      res.locals.user = user; 
      next();
    } else {
      res.status(401).json({ Message: 'You are not authenticated' });
    }
  } catch (err) {
    res.status(401).json({ Message: 'You are not authenticated', error: err.message });
  }
};

module.exports = {
  verify,
};
