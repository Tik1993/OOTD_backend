const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "Access denied" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      // console.log(err);
      return res.status(403).json({ message: "Access denied" });
    }
  });

  next();
};
