import bcrypt from 'bcryptjs'
import moment from 'moment'
import pool from '../helpers/dbHelper'

/**
 * @exports
 * @class UserController
 */
class UserController {

  /**
       * Returns an user
       * @method signUp
       * @memberof UserController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static signUp(req, res) {

    const { username, email, password } = req.body;
    const createdAt = moment().format('YYYY-MM-DD');
    const hashedPassword = bcrypt.hashSync(password, 6);
    const checkEmail = `SELECT * FROM users WHERE email = ${email}`
    const signUpQuery = 'INSERT INTO users (user_name,email,password,created_at) VALUES ($1, $2, $3, $4) returning *';
    const values = [username, email, hashedPassword, createdAt];

    pool.query(checkEmail)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(403).json({ message: 'Account already exists' });
        }
        pool.query(signUpQuery, values)
          .then((result1) => { res.status(200).send({ user: { id: result1.rows[0].id, username: result1.rows[0].username, Date_joined: result1.rows[0].created_at } }) })
          .catch(() => { res.status(500).json({ message: 'An error occured while processing this request ' }); });
        return null;

      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
    return null;
  }

  /**
       * Returns an user
       * @method signUp
       * @memberof UserController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static login(req, res) {
    const { email, password } = req.body;
    const loginQuery = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(loginQuery)
      .then((result) => {
        const validatePassword = bcrypt.compareSync(password.trim(), result.rows[0].password);
        if (result.rowCount === 0 || !validatePassword) {
          return res.status(401).json({ message: 'Email or Password incorrect' });
        }
        return res.status(200).json({
          name: result.rows[0].name, email: result.rows[0].email, is_admin: result.rows[0].is_admin, message: 'User has successfully logged in'
        });
      })
      .catch(() => { res.status(401).json({ message: 'Email or Password incorrect' }); });
    return null;

  }
}
export default UserController;
