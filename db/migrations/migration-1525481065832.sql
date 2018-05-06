DROP TABLE users_flashcards;

DROP TABLE flashcards_subjects;

ALTER TABLE flashcards
    ADD subject_id integer REFERENCES subjects(id);

ALTER TABLE flashcards
    DROP COLUMN user_id;
