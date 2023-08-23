const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    const errorMessage = "Login session expired. Please login again.";
    const errorCode = 401;

    res.status(errorCode).json({ 
      message: errorMessage,
      messageId: errorCode
    });
  }
};
