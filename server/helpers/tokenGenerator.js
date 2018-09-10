import jwt from 'jsonwebtoken';


const userToken = `${jwt.sign({
  id: '1'
}, process.env.TOKEN_SECRET_KEY)}`;
const userToken2 = `${jwt.sign({
  id: '2'
}, process.env.TOKEN_SECRET_KEY )}`;
const wrongToken = `${jwt.sign({
  id: '1'
}, 'fakesecretkey')}`

export default {
  userToken, userToken2, wrongToken
};
