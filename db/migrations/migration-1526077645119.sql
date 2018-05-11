ALTER TABLE flashcards
DROP CONSTRAINT flashcards_subject_id_fkey,
ADD CONSTRAINT flashcards_subject_id_fkey
  FOREIGN KEY (subject_id)
  REFERENCES subjects(id)
  ON DELETE CASCADE;
