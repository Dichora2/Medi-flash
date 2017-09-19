CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id integer REFERENCES users(id),
  term VARCHAR(255) NOT NULL,
  definition TEXT,
  date_created DATE,
  keepStudying BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS subjects (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id integer REFERENCES users(id),
  date_created DATE,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_flashcards (
  user_id integer REFERENCES users(id),
  flashcard_id integer REFERENCES flashcards(id)
);

CREATE TABLE IF NOT EXISTS flashcards_subjects (
  flashcard_id integer REFERENCES flashcards(id),
  subject_id integer REFERENCES subjects(id)
);
