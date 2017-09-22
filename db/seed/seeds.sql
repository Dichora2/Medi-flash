\c medi-flash_db;

INSERT INTO users (firstname, lastname, email, username, password_digest) VALUES ('Lenora', 'Rigoni', 'lenorarigoni@gmail.com', 'lenorarigoni', '111');
INSERT INTO users (firstname, lastname, email, username, password_digest) VALUES ('Daniel', 'Mercia', 'danielmercia@gmail.com', 'danielmercia', '222');
INSERT INTO users (firstname, lastname, email, username, password_digest) VALUES ('Michael', 'Gutleber', 'michaelgutleber@gmail.com', 'michaelgutleber', '333');


INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (1,'B cell', 'A type of white blood cell and, specifically, a type of lymphocyte.', '9/22/17', false);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (2,'F (coefficient of inbreeding', 'F is the symbol for the coefficient of inbreeding, a way of gauging how close two people are genetically to one another. The coefficient of inbreeding, F, is the probability that a person with two identical genes received both genes from one ancestor', '9/23/17', false);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (1,'Radiation fibrosis', 'Scarring of the lungs from radiation. Radiation fibrosis is a consequence of the repair process that follows radiation pneumonitis (inflammation of the lungs due to radiation), as from radiation therapy. Radiation fibrosis typically occurs within months to a few years after the completion of radiation treatments. Whereas the inflammation of radiation pneumonitis is often reversible with medications, radiation fibrosis is usually irreversible and permanent.','9/24/17', true);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (3, 'Galactose', 'A sugar found in milk. Galactose is a disaccharide that is made up of two sugars, galactose and glucose, that are bound together.', '9/25/17', false);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (2, 'Gamma ray', 'High-energy electromagnetic radiation emitted by certain radionuclides when their nuclei transition from a higher to a lower energy state. Gamma rays have high energy and a short wave length. All gamma rays emitted from a given isotope have the same energy, a characteristic that enables scientists to identify which gamma emitters are present in a sample. Gamma rays penetrate tissue farther than do beta particles or alpha particles, but leave a lower concentration of ions in their path to potentially cause cell damage. Gamma rays are similar to x-rays.', '9/20/17', true);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (1, 'Large-cell lymphoma', 'Cancer of the lymphatic tissue that is characterized by unusually large cells.', '9/18/17', true);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (2, 'Waardenburg syndrome', ' A genetic disorder that causes deafness, white forelock (a frontal white blaze of hair), a difference of color between the iris of one eye and the other (heterochromia iridis), white eye lashes, and wide-set inner corners of the eyes', '7/10/17', true);
INSERT INTO flashcards (user_id, term, definition, date_modified, keep_studying) VALUES (3, 'Eczema', 'A particular type of inflammatory reaction of the skin in which there is erythema (reddening), edema (swelling), papules (bumps), and crusting of the skin followed, finally, by lichenification (thickening) and scaling of the skin. Eczema characteristically causes itching and burning of the skin.', '8/9/17', true);




INSERT INTO subjects (user_id, date_modified,name) VALUES (1,'8/22/17','Anatomy');
INSERT INTO subjects (user_id, date_modified,name) VALUES (1,'9/20/17','Medicine');
INSERT INTO subjects (user_id, date_modified,name) VALUES (1,'7/2/17','Biology');
INSERT INTO subjects (user_id, date_modified,name) VALUES (2,'8/26/17','Antibiotics');
INSERT INTO subjects (user_id, date_modified,name) VALUES (2,'8/17/17','Enzymes');
INSERT INTO subjects (user_id, date_modified,name) VALUES (3,'8/4/17','Atoms');
INSERT INTO subjects (user_id, date_modified,name) VALUES (3,'9/20/17','Chem 101');
INSERT INTO subjects (user_id, date_modified,name) VALUES (3,'9/5/17','Join Pain');


INSERT INTO flashcards_subjects (flashcard_id, subject_id) VALUES (1, 3);
INSERT INTO flashcards_subjects (flashcard_id, subject_id) VALUES (2, 3);
INSERT INTO flashcards_subjects (flashcard_id, subject_id) VALUES (28, 3);
INSERT INTO flashcards_subjects (flashcard_id, subject_id) VALUES (29, 3);
INSERT INTO flashcards_subjects (flashcard_id, subject_id) VALUES (30, 3);







