import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import moment from 'moment'
import pool from '../helpers/dbHelper'
import validateAuth from '../helpers/validationHelpers';
import status from '../data/status.json'
import errorReporter from '../helpers/validationHelpers/authHelper'

/**
 * @exports
 * @class UserController
 */
class UserController {

  /**
       * Returns a user
       * @method signUp
       * @memberof UserController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static signUp(req, res) {

    const err = errorReporter(req);
    if (err.length !== 0) {
      return res.status(400).json({ status: status[400], error: err })
    }

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }
    const { username, email, password } = req.body;
    const createdAt = moment().format('YYYY-MM-DD');
    const hashedPassword = bcrypt.hashSync(password, 1);
    const checkEmail = `SELECT email FROM users WHERE email = '${email}'`;
    const signUpQuery = `INSERT INTO users (user_name, email, password, created_at) values ('${username}', '${email}', '${hashedPassword}', '${createdAt}') RETURNING *`;

    pool.query(checkEmail)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(403).json({ Status: status[403], message: 'Account already exists' });
        }
        pool.query(signUpQuery)
          .then((result1) => {
            const token = jwt.sign(
              { id: result1.rows[0].id },
              process.env.TOKEN_SECRET_KEY,
              { expiresIn: 86400 },
            );
            return res.status(201).json({
              status: status[201],
              message: `${result1.rows[0].user_name} was added successfully`,
              userName: result1.rows[0].user_name,
              email: result1.rows[0].email,
              token
            });
          })
          .catch(() => { res.status(500).json({ status: status[500], message: 'An error occured while processing this request ' }); });
        return null;
      })
      .catch((err) => { res.status(500).json({ status: status[500], message: `An error occured while ${err} processing this request 1` }); });
    return null;



  }

  /**
       * Returns a user
       * @method login
       * @memberof UserController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static login(req, res) {

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const loginQuery = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(loginQuery)
      .then((result) => {
        const validatePassword = bcrypt.compareSync(password.trim(), result.rows[0].password);
        if (result.rowCount === 0 || !validatePassword) {
          return res.status(401).json({ status: status[401], message: 'Email or Password incorrect' });

        }
        const token = jwt.sign({ id: result.rows[0].id }, process.env.TOKEN_SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).json({

          status: status[200],
          name: result.rows[0].user_name,
          email: result.rows[0].email,
          token: token
        });
      })
      .catch(() => { res.status(500).json({ status: status[500], message: 'An error occured while processing this request 1' }); });
    return null;

  }
}
export default UserController;
