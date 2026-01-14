// routes/auth.js
const jwt = require("jsonwebtoken");

exports.me = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({
      authenticated: true,
      userId: decoded.id,
    });
  } catch {
    return res.json({ authenticated: false });
  }
};
