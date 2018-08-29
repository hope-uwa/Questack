import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'You are unauthorised to make this request' });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Could not authenticate the provided token' });
    }
    req.userId = decoded.id;
    next();
    return null;
  });
  return null;
};

export default verifyToken;
