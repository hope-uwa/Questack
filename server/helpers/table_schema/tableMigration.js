import pool from '../dbHelper';

class TableMigrations {



  static createTables(req, res) {

    const createQuestion = `CREATE TABLE IF NOT EXISTS questions(
            id serial PRIMARY KEY NOT NULL,
            user_id integer NOT NULL,
            question_title varchar(50) NOT NULL,
            question_body varchar(250) NOT NULL,
            created_at timestamp DEFAULT NOW()            
            )`;

    const createAnswer = `CREATE TABLE IF NOT EXISTS answers
            (
            id serial PRIMARY KEY NOT NULL,
            user_id integer NOT NULL,
            question_id integer NOT NULL,
            answer_body character(250) NOT NULL,
            created_at timestamp DEFAULT NOW()
            )`;

    const createUser = `CREATE TABLE IF NOT EXISTS users(
                id serial PRIMARY KEY NOT NULL,
                user_name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                created_at timestamp DEFAULT NOW()
                )`;


    const createPreferredAnswer = `CREATE TABLE IF NOT EXISTS preferred(
        id serial PRIMARY KEY NOT NULL,
        question_id integer NOT NULL,
        answer_id integer ,
        created_at timestamp DEFAULT NOW() 
      )`;

    const createVote = `CREATE TABLE IF NOT EXISTS votes(
        id serial PRIMARY KEY NOT NULL,
        user_id integer NOT NULL,
        answer_id integer NOT NULL,
        vote varchar(50) NOT NULL,
        created_at timestamp DEFAULT NOW() 
      )`;

    const createComment = `CREATE TABLE IF NOT EXISTS comments
        (
        id serial PRIMARY KEY NOT NULL,
        user_id integer NOT NULL,
        answer_id integer NOT NULL,
        comment_body character(250) NOT NULL,
        created_at timestamp DEFAULT NOW() 
        )`;



    pool.query(createUser)
      .then(() => pool.query(createQuestion))
      .then(() => pool.query(createAnswer))
      .then(() => pool.query(createPreferredAnswer))
      .then(() => pool.query(createComment))
      .then(() => pool.query(createVote))
      .then((result) => res.send('Tables Created'))
      .catch(err => err);

  }

  static dropTables(req, res) {
    const deleteUsers = 'DROP TABLE IF EXISTS users';
    const deleteQuestions = 'DROP TABLE IF EXISTS questions';
    const deleteAnswers = 'DROP TABLE IF EXISTS answers';
    const deletePreferred = 'DROP TABLE IF EXISTS preferred';
    const deleteVotes = 'DROP TABLE IF EXISTS votes';
    const deleteComments = 'DROP TABLE IF EXISTS comments';

    pool.query(deleteUsers)
      .then(() => pool.query(deleteQuestions))
      .then(() => pool.query(deleteAnswers))
      .then(() => pool.query(deletePreferred))
      .then(() => pool.query(deleteVotes))
      .then(() => pool.query(deleteComments))
      .then((result) => res.send('Tables Dropped'))
      .catch(err => err);
  }




}
export default TableMigrations;
