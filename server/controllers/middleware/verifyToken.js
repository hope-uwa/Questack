import jwt from 'jsonwebtoken';
import status from '../../data/index'

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ status: status[401], error: 'You are unauthorised to make this request' });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: status[401], error: 'Could not authenticate the provided token' });
    }
    req.userId = decoded.id;
    next();
    return null;
  });
  return null;
};

export default verifyToken;
