// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.modle");


exports.test = (req, res) => {
  res.send("Auth controller is working");
}

/* SIGNUP */
exports.signup = async (req, res, next) => {
  try {
    const {name, email, password } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ error: "Name, email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      name, 
      email, 
      password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie('access_token', token, {
      httpOnly: true,  // safe from JS
      secure: false,   // false for localhost
      sameSite: 'Lax', // works with cross-port localhost
      maxAge: 3600000  // 1 hour
    });


    res.status(201).json({
       message: "User registered successfully", 
       tokenID: token ,
       user: { id: user._id, name: user.name, email: user.email }
      });
  } catch (err) {
    next(err);
  }
};

/* LOGIN */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
