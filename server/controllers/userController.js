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
    const hashedPassword = bcrypt.hashSync(request.body.password, 6);
    const checkEmail = `SELECT * FROM users WHERE email = ${email}`
    const signUpQuery = 'INSERT INTO users (user_name,email,password,created_at) VALUES ($1, $2, $3, $4) returning *';
    const values = [username, email, hashedPassword, createdAt];

    pool.query(checkEmail)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(403).json({ message: 'Account already exists' });
        }
        pool.query(signUpQuery)
          .then((result) => res.status(200).send({ user: { id: result.rows[0].id, username: result.rows[0].username, role: result.rows[0].role } }))
          .catch(() => { res.status(500).json({ message: 'An error occured while processing this request ' }); });
        return null;

      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
    return null;
  }

}
export default UserController;
