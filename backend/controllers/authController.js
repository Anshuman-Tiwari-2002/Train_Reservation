const jwt = require("jsonwebtoken");
const users = [];
const signupUser = (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const newUser = { username, password };
  users.push(newUser);
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({ token });
};
const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
};
module.exports = { signupUser, loginUser };